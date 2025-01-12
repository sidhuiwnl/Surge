import puppeteer from "puppeteer";
import * as path from "node:path";
import * as fs from "node:fs";
import express, { Request,Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())


async function getBrowser(){
    const audioPath = path.resolve(__dirname,"../silent-audio.mp3");

    const browser = await puppeteer.launch({
        // executablePath : process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
        headless: false,
        args : [
            "--disable-blink-features=AutomationControlled",
            "--auto-select-desktop-capture-source",
            "--use-fake-ui-for-media-stream",
            "--mute-audio",
            `--use-file-for-fake-audio-capture=${audioPath}`,
            "--window-position=-32000,-32000",
            "--start-minimized",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--single-process",
            "--no-zygote",
            '--disable-dev-shm-usage'
        ]
    })

    let page = await browser.newPage();
    console.log(page)
    await page.setViewport({
        width: 1920, height: 1080
    })
    return { browser,page}
}


async function getMeet(url : string){
    let browser;
    let page;

    const webscriptCode = fs.readFileSync("../spawner/dist/script.js","utf-8")
    const browserInstance = await getBrowser();
    browser = browserInstance.browser;
    page = browserInstance.page;

    console.log("browser is present");
    await page.goto(url)
    console.log("browser is rendered");
    await page.locator('span ::-p-text(Got it)').click()
    console.log("the popup is clicked");
    await page
        .locator("input[placeholder='Your name']")
        .fill("Meet Bot")
    await page
        .locator("span ::-p-text('Ask to join')").click()

    const elementSelector = "div[jscontroller=\"yEvoid\"][jsname=\"NeC6gb\"]";
    try {
        await page.waitForSelector(elementSelector, { timeout: 10000, visible: true });
        console.log("Element found!");
        await page.evaluate(`${webscriptCode}webScript();`);


        await page.evaluate(() => {
            return new Promise((resolve) => {
                const checkForEndText = () => {
                    const endText = document.querySelector("h1");
                    if (endText && (
                        endText.innerText === "You've been removed from the meeting" ||
                        endText.innerText === "You've left the meeting"
                    )) {
                        clearInterval(intervalId);
                        resolve(true);
                    }
                };
                const intervalId = setInterval(checkForEndText, 1000);
            });
        });

    } catch (error) {
        console.log("Element not found within timeout. Skipping script execution.");
        await browser.close();
    }finally {
       if(browser){
           try {
               await browser.close();
           }catch (error) {
               console.error("Error closing browser:", error);
           }
       }

    }
}

app.post("/getMeetId",(req : Request,res : Response) =>{
    const  link = req.body.link;
    console.log(link);
    const isLinkValid = /^(https:\/\/(meet\.google\.com\/[a-zA-Z0-9-]+)|zoom\.(us|gov)\/j\/\d+)$/.test(link);


    if(isLinkValid){
        getMeet(link);
        res.status(200).json({
            message : "Meeting link is valid"
        })
    }else {
        res.status(400).json({
          message :   "Invalid link"

        });
    }
})



// getMeet("https://meet.google.com/nhx-tapc-opw");


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})