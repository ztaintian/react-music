import React, { useState, useEffect } from 'react'
import axios from 'axios'
function List() {
  const [data, setData] = useState({ songResultData: {result:[]} });
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(
        `http://pd.musicapp.migu.cn/MIGUM2.0/v1.0/content/search_all.do?&ua=Android_migu&version=5.0.1&text=周杰伦&pageNo=1&pageSize=10&searchSwitch={"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}`,
      ).then((result) => {
        setData(result.data);
      });
    };
    fetchData();
  }, []);
  let { songResultData: {result} } = data
  return (
    <div>
      {result.map((item,index) => {
        return (
          <div key={index}>{item.name}</div>
        )
      })}
    </div>
  )
}

export default List