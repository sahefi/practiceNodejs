var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  // try {
  //   const nilai = 90.00
  //   if(nilai === 100.00 ){
  //     res.send ("Lulus")
  //   } else {
  //     if (nilai <= 80.00 && nilai >= 75.00){
  //       res.send ("B")
  //     } else  {
  //       if (nilai < 75.00 && nilai >= 70.00 ){
  //         res.send ("C")
  //       } else if (nilai < 70.00 && nilai >= 60.00 ){
  //         res.send ("E")
  //       } else {
  //         throw new Error()
  //       }
  //     }
  //   }
  // } catch (error) {
  //   console.log (error)
  //   throw new Error(error)
  // }
  try {
    const nilai = 90.05;
  
    if (nilai === 100.00) {
      res.send("Lulus");
    } else if (nilai <= 100.00 && nilai >= 75.00) {
      res.send("B");
    } else if (nilai < 75.00 && nilai >= 70.00) {
      res.send("C");
    } else if (nilai < 70.00 && nilai >= 60.00) {
      res.send("E");
    } else {
      throw new Error("Kamu Goblog");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  
  
});
router.get("/for", function(req,res){
  const str = req.query.str;
  
  if (!str) {
    return res.status(400).send('Parameter "str" diperlukan');
  }

  let vokal = "aiueoAIUEO"
  let konsonan = "bcdfghjklmnpqrstvwxyzABCDFGHJKLMNPQRSTVWXYZ"

  console.log("Vokal")
  for (i = 0 ; i < str.length; i++){
    for(y = 0 ; y < vokal.length; y++){
      if(str[i] === vokal[y]){
        console.log(str[i]);
      }
    }
  }
  console.log("Konsonan")
  for(s = 0 ; s < str.length; s++){
    for(k = 0 ; k < konsonan.length; k++){
      if(str[s] === konsonan[k]){
        console.log(str[s]);
      }
    }
  }

});
router.get("/permen", function(req,res){

  let permenAwal = 10 
  let permenPemberian = 1
  let jumlahHari = 5 

  let permenYangDiBerikan = jumlahHari * permenPemberian
  let sisaPermen = permenAwal - permenYangDiBerikan

  console.log("Sisa permen adalah",sisaPermen)



})
router.get("/angkaTerbesar", function(req,res){

const angka = [3, 15, 7, 20, 10, 5, 30, 25];

let angkaTerbesar = angka[1]

for(i = 1; i < angka.length;i++){
  if(angka[i] > angkaTerbesar){
    angkaTerbesar = angka[i]
  }
  
}
console.log(angkaTerbesar)

})
router.get("/bintang",function(req,res){

  // const tinggiSegitiga = 5;
  const {tinggi} = req.query
if(!tinggi){
  res.send({
    message:"Masukkan Tinggi"
  }).status(400)
}else{
  for (let i = 1; i <= tinggi; i++) {
    let bintang = ' ';
    
    for (let j = tinggi - i; j >= 1; j--) {
      bintang += ' ';
    }

    for (let k = 1; k <=  2 * i-1 ; k++) {
      
     bintang +='*'
    }
    console.log(bintang);
  }
  return res.send({
    status:true,
    message:"Succes"
  })
}


})

function listRokok(){
  const rokokMahal = ["Black","LA","Marlong"]
  return rokokMahal
}
function rokokObject(){
  const rokokMurah =[
    {
      nama:"Malboro",
      jumlah : {
        stock : 2,
        stock_gudang : 5
      }
    },
    {
      nama:"LA",
      jumlah : {
        stock : 1,
        stock_gudang : 10
      }
    }
  ]
  return rokokMurah
}

router.get("/array",(req,res)=>{
  const rokokList = listRokok()
  const {filterRokok} = req.query
  const rokoFilter = rokokList.filter((rokok)=>rokok==filterRokok)
  
  if(!filterRokok){
    res.send({
      rokok:rokokList,
      status:true
    })
  }else{
    res.send({
      rokok:rokoFilter,
      status:true
    })
  }

})

router.get("/forRokok",(req,res)=>{
  const rokoList = listRokok()
  let result = []
  const {filter} = req.query
if(!filter){
  res.send({
    rokok:rokoList
  })
}else{
  for(i = 0; i < rokoList.length; i ++){ 
      if(rokoList[i] === filter){
        result.push(rokoList[i])
      }
  }
  return res.send({
    rokok:result
  })
}
})


router.get("/objectRokok",(req,res)=>{
  const rokokList = rokokObject()
  let hasil = []
  const {filterNama,addStock,addStockGudang}=req.query
  const {objectRokok}=req.body
  if (!filterNama){
    res.send({
      status:true,
      message:"Succes",
      data:rokokList
    })
  }else{
    for(i = 0; i < rokokList.length; i++){

      if(rokokList[i].nama === filterNama){
        if(rokokList[i].jumlah.stock_gudang + Number(addStockGudang||0) >= Number(addStock||0)){

          if(addStock){
            rokokList[i].jumlah.stock_gudang  = rokokList[i].jumlah.stock_gudang - Number(addStock)
            rokokList[i].jumlah.stock = rokokList[i].jumlah.stock + Number(addStock||0)   
          }
          if(addStockGudang){
            rokokList[i].jumlah.stock_gudang = rokokList[i].jumlah.stock_gudang + Number(addStockGudang||0)
          }

          hasil.push(rokokList[i])
          
        }else{
          res.status(400).send({
            status:false,
            message:"Stock Gudang Tidak Cukup",
            data : null
          }); 
        }
      }
      
    }
    return res.send({
      status:true,
      message:"Succes",
      data:hasil
    })
  }
})



module.exports = router;
