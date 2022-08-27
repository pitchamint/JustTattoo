import { useState } from "react";
import "./App.css";
import Appheader from "./component/Appheader";
import AppSearch from "./component/AppSearch";
import TattooItem from "./component/TattooItem";
import TattooPost from "./component/TattooPost";
import tattoos from "./data/Tattoos";

function App() {
  //selectedTattoo เป็นตัวแปรข้อมูลของเราเอาไปใช้ต่อในแอฟได้  /setSelectedTattoo ใช้สำหรับเซตข้อมูลใหม่ให้ textของเรา
  //สร้าง state มาเพื่อจะทำ Popup รูปภาพ ใน component TattooPost
  const [selectedTattoo,setSelectedTattoo] = useState(null);
  
  //State ที่ใช้ในการเก็บค่าเพื่อค้นหา
  const [searchText, setSearchText] = useState('');

  //สร้างเหตุการณ์เพื่อเปลี่ยน useState เมื่อกดปุ่มให้แสดงผลจาก null ไปเป็น tattoos[1] /อะไรก็ตามที่เรากำหนดใน setSelectedTattoo
  function onTattooOpenClick(theTattoo){
    setSelectedTattoo(theTattoo);
  } //ในบางเหตุการณ์เราจะไม่สามารถใส่ event ให้กับ tag Component ได้ตรงๆ
  //เราต้องทำให้ function onTattooOpenClick สามารถไปทำงานกับ TattooItem ได้

  //สร้างฟังก์ชั่นในการปิดหน้า Popup
  function onTattooCloseClick(){
    setSelectedTattoo(null);
  }

  //ทำการกรอง (filter) searchText
  // const filteredTattoos = tattoos.filter((tattoo)=>{
  //   return tattoo.title.includes(searchText);
  //   //เอา filteredTattoos ไปใส่ต่อ tattoos ที่อยู่ก่อนหน้า .map ใน tattooElement
  // });

  //จากใน array เราต้องการแสดงค่าให้ออกมาเป็น component ของ react
  // การ map จะตล้ายกับฟังก์ชั่น for each คือ ค่าใน array แต่ละตัวจะนำไปผ่าน function ที่เรากำหนดค่าไว้ จะ return ค่าออกมาเป็น array
  const tattooElements = tattoos.filter((tattoo)=>{
    return tattoo.title.includes(searchText);}).map((tattoo, index)=>{
    return <TattooItem key={index} tattoo = {tattoo}  onTattooClick = {onTattooOpenClick}/>
  });

  let tattooPost = null //ตั้งค่าเริ่มต้นเป็นค่าว่าง
  if(!!selectedTattoo){
    tattooPost = <TattooPost tattoo = {selectedTattoo} onBgClick={onTattooCloseClick}/> //ส่งค่า state มาเป็น props
  }

  return (
    <div className="App">
      <Appheader/>
      <section className="app-section">
        <div className="app-container">
          <AppSearch value={searchText} onValueChange={setSearchText}/>
          {/* ผูกเหตุการณ์ได้เลยที่ปุ่มใส่แค่ชื่อของฟังก์ชั่นเท่านั้น*/}
          {/* ถ้าไม่ใส่ฟังก์ชั่นเราสามารถใช้ ArrowFunction ได้ ทำให้เราสามารถเปลี่ยนแปลงค่า Onclick นี้ได้เลย */}
          {/* <button onClick={() => {onTattooOpenClick(tattoos[3])}}>สักหน่อยมั้ยละ</button> */}
          <div className="app-grid">
            {/* ใส่ชื่อและรูปภาพต่อท้ายแท็กของเราได้เลย thumnaiUrl คือเสิร์ชรูปภาพ */}
            {tattooElements}
          </div>
      {tattooPost}
        </div>
      </section>
    </div>
  );
}

export default App;
