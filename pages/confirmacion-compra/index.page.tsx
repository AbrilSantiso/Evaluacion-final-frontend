import { Alert, Box, Card, Typography } from "@mui/material";
import { useAddressInfoContext } from "context/AddressInfoContext";
import { useOrderContext } from "context/OrderContext";
import { usePersonalInfoContext } from "context/PersonalInfoContext";
import ProductCard from "dh-marvel/components/home/productCard/productCard";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from 'next/router'


const ConfirmationOrderPage: NextPage = () => {

  const { order } = useOrderContext();
  const { personalInfo } = usePersonalInfoContext();
  const { addressInfo} = useAddressInfoContext();
  
  const router = useRouter();

 

  if (!order || !personalInfo || !addressInfo) {
    return (
      <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: "30px" }}>No tienes ningún comic en tu carrito</Typography>
        <Link href="/">Volver al home</Link>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography align="center" variant="h4" sx={{color:"white", width: '90%', backgroundColor:"green", fontWeight:"700"}}>
        Felicitaciones!
      </Typography>
      <Box sx={{ width: '100%', display: "flex", flexDirection: "column", alignItems: "center", flexWrap: "wrap", justifyContent: "center", marginTop:"20px"}}>
        <ProductCard comic={order} isCheckout/>
        <Box sx={{ width: '100%', display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", marginTop:"20px"}}>
          <Card sx={{ width: '40%', margin:"10px"}}>
            <Typography variant="h6" sx={{ margin:"10px", fontWeight:"600"}}>
                Datos Personales 
            </Typography>
            <Typography sx={{ margin:"5px"}}>
                {personalInfo?.Nombre} {personalInfo?.Apellido}
            </Typography>
            <Typography sx={{ margin:"5px"}}>
                {personalInfo?.Email}
            </Typography>
          </Card>
          <Card sx={{ width: '40%', margin:"10px"}}>
            <Typography  variant="h6" sx={{ margin:"10px", fontWeight:"600"}}>
                Dirección de entrega
            </Typography>
            <Typography sx={{ margin:"5px"}}>
                {addressInfo.Dirección} 
            </Typography>
            <Typography sx={{ margin:"5px"}}>
                {addressInfo.Ciudad}, ({addressInfo["Codigo Postal"]})
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>)
}
(ConfirmationOrderPage as any).Layout = LayoutCheckout;
export default ConfirmationOrderPage;