/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
sap.ui.define([
    "com/te/scanning/controller/BaseController",
    "sap/m/MessageBox"
], function (Controller,
    MessageBox) {
    "use strict";

    return Controller.extend("com.te.scanning.controller.Main", {

        onInit: function () {
            this.scanningStarted = false;
        },

        onStartScanning: function () {
            this.byId(this.getView().createId("scandit-barcode-picker")).setVisible(true);
            if (this.scanningStarted == false) {
                this.scanningStarted = true;
                ScanditSDK.configure("ASlgHC7RDjTYEzgsxAQvaCUMxci2CkambFNeA/N+r/ELQYflOHwAve1J3Pgoc/VLp3SxltMzvXcpCskCb2HPSHN0/yQbaNRXRyRut5dlFtK4ZJP/JFly3QwrfDnMPIwbyg6K85AHsF091+pVIcOoKv5+HiuAYwUMpER7DydbUeKhQXt8fTdHsOh8bBgMRDoMH5L+Glr2c4NtRGYFqCg38XpLiIWQNIBe1T4vzRDPPDSXVniMKZGBrMdbvOYFiqDkShElJQE9z6Gdb9Jad+SUnOSksi6clfLtd/DVb9N/QiTFs1yD+nf+QVOHwUuo+sGuB/mEkC95dmtllwGoO2WlQe4eFO/yT6SFH0o8+eM2e8/+tWyLMrWJk67KrccJSVtqe82l9sNkzZ0m4FhVTFw+OFaXqiyksKyV9fYalkMM2Y5brm7hBc2S0CMpL38x6I+Exs5xz6N5HikU5XmVygOXHHfRHEp7AN7+z7KTKhE1OfIyWrcKiP0gGymXnGtZv1JaXp27aCFtWTXu8EB6ylCG0ZqNcOzTk7W/SXiQ7CKkA5W8Vmmvmgf+Stvt0g+ci3DmoKJUJ9UmDi1PtombctWOcE1PjaB6ngWtrPTVCZxNBqnoDan1OlC0T0YrLPTFUUsS80xR/8d0joiemzcQ8OikJLJhOESYDS4DVVPcF01L0EMBJKYF7JfUIB3WxSBfyFYy00vkfomP8ayEUodTMNGsS7KgagZojkyMhvOMubdDeUdtX9n6hORy2R9LTeSxs7dmpshm+KWhknT1wAHZjwZQOSx3t7sEx7S3vZpVZhbnt/jnwJb4B67a", {
                    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/",
                }).then(() => {
                    return ScanditSDK.BarcodePicker.create(document.getElementById(this.getView().createId("scandit-barcode-picker")), {
                        // enable some common symbologies
                        scanSettings: new ScanditSDK.ScanSettings({ enabledSymbologies: ["ean8", "ean13", "upca", "upce"] }),
                    });
                }).then((barcodePicker) => {
                    // barcodePicker is ready here, show a message every time a barcode is scanned
                    barcodePicker.on("scan", (scanResult) => {
                        MessageBox.alert(`Scanned Value ${scanResult.barcodes[0].data}`);
                    });
                });
            }
        },

        onStopScanning: function () {
            this.byId(this.getView().createId("scandit-barcode-picker")).setVisible(false);
            MessageBox.alert("Barcode Scanning stopped");
        }

    });
});
