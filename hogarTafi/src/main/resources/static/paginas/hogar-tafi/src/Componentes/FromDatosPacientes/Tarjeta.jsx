import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import Boton from "./Boton";
   
  export default function Tarjeta({textoTarjeta}) {
    return (
      <Card className="mt-6 bg-transparent text-neutral-300 border-white border-2 rounded-lg shadow-lg">
        <CardHeader color="blue-gray" className="md:w-full">
          <img
            src="https://via.placeholder.com/300"
            alt="imagen"
            className="md:w-full sm:w-full"
          />
        </CardHeader>
        <CardBody className="flex justify-center">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {textoTarjeta}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex justify-center">
          <Boton textoBoton={"Cargar imagen"}></Boton>
        </CardFooter>
      </Card>
    );
  }