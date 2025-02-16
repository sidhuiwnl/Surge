import puppeteer from "puppeteer";
import * as path from "node:path";
import * as fs from "node:fs";
import express, {Request,Response} from "express";
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();

const app = express();

app.use(express.json());

const corsOption = {
    origin: "*",
}
app.use(cors(
    corsOption
))



async function getBrowser(){
    const audioPath = path.resolve(__dirname,"../silent-audio.mp3");

    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/google-chrome-stable",
        headless: false,
        args : [
            "--disable-blink-features=AutomationControlled",
            "--auto-select-desktop-capture-source",
            "--use-fake-ui-for-media-stream",
            "--mute-audio",
            `--use-file-for-fake-audio-capture=${audioPath}`,
            // "--window-position=-32000,-32000",
            // "--start-minimized",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920,1080',
            "--allow-running-insecure-content",
            "--disable-web-security",
        ],
        env : {
            DISPLAY: process.env.DISPLAY || ':99',
        }
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

    const scriptPath = path.resolve(__dirname,"../dist/script.js")

    const scriptCode = fs.readFileSync(scriptPath,"utf-8")

    console.log(scriptCode)


    const browserInstance = await getBrowser();
    browser = browserInstance.browser;
    page = browserInstance.page;

    console.log("browser is present");
    await page.goto(url,{
        timeout:60000,
    })
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
        await page.waitForSelector(elementSelector, { timeout: 50000,visible : true });

        console.log("Element found!");


        await page.evaluate(`${scriptCode}webScript();`);



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



// getMeet("https://meet.google.com/ynt-mspg-yig")


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})











