import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './list.styl'
function List() {
  const [data, setData] = useState({ songResultData: { result: [] } });
  const [name, setName] = useState('刘德华');
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  let [contentId, setContentId] = useState(null);
  const audio = useRef(null)
  function getSong() {
    return axios.get(
      `http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?&ua=Android_migu&version=5.0.1&text=${name}&pageNo=${pageNo}&pageSize=${pageSize}&searchSwitch={"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}`,
    ).then((result) => {
      setData(result.data);
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getSong()
    };
    fetchData();
  }, []);
  console.log('audio', audio)
  let { songResultData: { result } } = data
  return (
    <div className="list">
      {result.map((item, index) => {
        return (
          <div key={index} onClick={() => {
            setContentId(item.contentId)
          }}>{item.name}</div>
        )
      })}
      <audio ref={audio} controls onEnded={() => {
        result.map((item,index) => {
          if (contentId === item.contentId) {
            if (index === result.length-1) {
              contentId = result[0].contentId
            } else {
              contentId = result[index+1].contentId
            }
          }
        })
        setContentId(contentId)
      }} autoPlay src={`http://app.pd.nf.migu.cn/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=HQ&netType=00&userId=15548614588710179085069&ua=Android_migu&version=5.1&copyrightId=0&contentId=${contentId}&resourceType=2&channel=1`}>
        您的浏览器不支持 audio 标签。
      </audio>
    </div>
  )
}

export default List