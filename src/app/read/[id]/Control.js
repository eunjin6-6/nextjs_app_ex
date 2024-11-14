"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";


const Control = ()=>{
  const params = useParams();
  const id = params.id;
  
  const router = useRouter(); //라우트 초기화 먼저

  const deleteTopic = ()=>{
    const option = {method: 'DELETE'};

    fetch('http://localhost:9999/topics/'+id, option)
    .then(res=>{
       return res.json();//json->object
    })
    .then(result=>{
      router.push('/'); //성공한 후, 루트로 페이지 이동
      router.refresh();
    });
  }

  
  return(
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id && <>
        <li><Link href={`/update/${id}`}>Update</Link></li>
        <li><button onClick={deleteTopic}>delete</button></li>
      </>}     
    </ul> 
  )
}
export default Control;