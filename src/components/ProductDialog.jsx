import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  DialogFooter,
} from "@material-tailwind/react";
import Honey from "./../assets/images/honey-jar.jpg";
const ProductDialog = ({ selectedProduct, openDialog, handleOpenDialog }) => {
  return (
    selectedProduct && (
      <Dialog size="xl" open={openDialog} handler={handleOpenDialog}>
        <DialogHeader className="justify-center">
          <div className="flex items-center gap-3">
            <div className="-mt-px flex flex-col">
              <Typography
                variant="h4"
                color="blue-gray"
                className="font-medium"
              >
                {selectedProduct?.name}
              </Typography>
            </div>
          </div>
        </DialogHeader>
        <DialogBody divider={true} className="p-4">
          <div className="flex flex-col md:flex-row">
            <img
              alt={selectedProduct?.name}
              className="max-w-[400px] max-h-[300px] flex-1"
              src={Honey}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="font-medium flex-2"
            >
              {selectedProduct?.description}
            </Typography>
          </div>
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center gap-16 px-4">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Price
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {selectedProduct?.price + " TND"}
              </Typography>
            </div>
          </div>
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
          >
            Order One Now
          </Button>
        </DialogFooter>
      </Dialog>
    )
  );
};

export default ProductDialog;
