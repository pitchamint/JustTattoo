import './TattooItem.css'

function TattooItem(props){ //ตั้งเป็น props(เป็น object) เพื่อที่จะสามารถเปลี่ยนข้อมูลภายใน item ได้
    //สกัดตัวแปรออกมาจาก object props
    const { tattoo, onTattooClick } = props;
    return(
      //เอาตัวแปรมาตั้งแทนที่หัวข้อและรูปภาพ
        <div className='tattoo-item'>
          <img src={tattoo.thumbnailUrl} onClick={() => {onTattooClick(tattoo)}}/>
          <h4>{tattoo.title}</h4>
        </div>
    )
}

export default TattooItem;