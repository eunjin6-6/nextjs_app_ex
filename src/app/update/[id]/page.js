"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";

// 모든 가능한 id 값을 반환하는 generateStaticParams 함수
export async function generateStaticParams() {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`);
  const topics = await resp.json() ;//json->object
 
  return topics.map((topic) => ({
    id: topic.id.toString(),
  }));
}


export default function Update(props) {
  const params = useParams();
  const id = params.id;

  /*
  서버형 컴포넌트 데이터 조회
  // const response = await fetch(`http://localhost:9999/topics/${props.params.id}`);
  // const topic = await response.json(); //json->object
  */

  //client 컴포넌트에서 데이터 조회
  //const [topic, setTopic] = useState([]);
  const [title, setTitle] = useState([]);
  const [body, setBody] = useState([]);


  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id)
    .then(res=>{
       return res.json();//json->object
    })
    .then(result=>{
      setTitle(result.title);
      setBody(result.body);
    });
  },[id])



  const router = useRouter()

  const onSubmit = (e)=>{
    e.preventDefault();
    // const title = e.target.title.value;
    // const body = e.target.body.value;

    const options = {
        method: "PATCH",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({title, body}), //사용자가 입력한 내용을 object->json로 변경
    }
    fetch(process.env.NEXT_PUBLIC_API_URL+'topics/'+id, options)
      .then(res=>res.json()) //결과를 object 객체로 변환
      .then(result =>{
        console.log(result);
        router.push(`/read/${result.id}`);
        router.refresh();
      }); //결과를 object 객체로 변환

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={(e)=>{
              setTitle(e.target.value);
            }} 
            placeholder="title"
          ></input>
        </div>
        <div>
          <textarea 
            name="body" 
            value={body} 
            onChange={(e)=>{
              setBody(e.target.value);
            }} 
            placeholder="content"
          ></textarea>
        </div>
        <button type="submit">전송</button>
      </form>
      <hr/>
    </div>
  );
}
