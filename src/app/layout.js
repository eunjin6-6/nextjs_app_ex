//"use client" ->일부분만으로 변경

//import localFont from "next/font/local"; //컴퓨터에 있는 폰트 로드
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Control from "./read/[id]/Control";
// import { useEffect, useState } from "react";


/*
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/


export const metadata = {
  title: "Web Tutorials",
  description: "Generated by green-Hongej",
};



export default async function RootLayout({ children }) {
  
  /* client 컴포넌트에서 데이터 조회하는 방식
  const [topics, setTopics] = useState([]);
  useEffect(()=>{
    fetch('process.env.NEXT_PUBLIC_API_URL+'topics')
    .then(res=>{
       return res.json();//json->object
    })
    .then(result=>{
      setTopics(result)
    });
  },[])
 */

  //console.log(topics); //데이터 배열로 저장되어있음
  
  //server 형 컴포넌트에서 데이터 조회하는 방식
  //목록출력 
  //{ cache:  'no-store' } //0초후 폐기
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics');
  const topics = await response.json(); //json->object

  return (
    <html lang="en">
      {/* 폰트 로드해서 적용하는 부분 참고
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body> */}
      
      <body>
        <h1>
          <Image src="/home_google_icon.png" alt="home icon" width={48} height={48}></Image>
          <Link href="/">WEB</Link>
        </h1>
        <nav>
          <ol>
            {
              // topics.map((item,idx)=>
              //     <li key={item.id}>{item.title}</li>
              // )
              topics.map(topic=> <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>)
            }
            {/* <li><Link href="/read/1">html</Link></li>
            <li><Link href="/read/2">css</Link></li>
            <li><Link href="/read/3">javascript</Link></li> */}
          </ol>
        </nav>
        {children}
        <Control/>   
      </body>
    </html>
  );
}
