const { jsPDF } = require("jspdf");

const OutputType = {
  Save: "save", //save pdf as a file
  DataUriString: "datauristring", //returns the data uri string
  DataUri: "datauri", //opens the data uri in current window
  DataUrlNewWindow: "dataurlnewwindow", //opens the data uri in new window
  Blob: "blob", //return blob format of the doc,
  ArrayBuffer: "arraybuffer", //return ArrayBuffer format
};

function jsPDFInvoiceTemplate(props) {
  const param = {
    outputType: props.outputType || "save",
    returnJsPDFDocObject: props.returnJsPDFDocObject || false,
    fileName: props.fileName || "",
    orientationLandscape: props.orientationLandscape || false,
    compress: props.compress || false,
    logo: {
      src: props.logo?.src || "",
      type: props.logo?.type || "",
      width: props.logo?.width || "",
      height: props.logo?.height || "",
      margin: {
        top: props.logo?.margin?.top || 0,
        left: props.logo?.margin?.left || 0,
      },
    },
    stamp: {
      inAllPages: props.stamp?.inAllPages || false,
      src: props.stamp?.src || "",
      width: props.stamp?.width || "",
      height: props.stamp?.height || "",
      margin: {
        top: props.stamp?.margin?.top || 0,
        left: props.stamp?.margin?.left || 0,
      },
    },
    company: {
      name: props.company?.name || "",
      address1: props.company?.address1 || "",
      address2: props.company?.address2 || "",
      phone: props.company?.phone || "",
      email: props.company?.email || "",
      email_1: props.company?.email_1 || "",
      website: props.company?.website || "",
      pan: props.company?.pan || "",
    },
    signature: {
      sign_img_src: props.signature?.sign_img_src || "",
      name: props.signature?.name || "",
      designation: props.signature?.designation || ""
    },
    document: {
      label: props.document?.label || "",
      body1: props.document?.body1 || "",
      body2: props.document?.body2 || "",
      body3: props.document?.body3 || "",
      body4: props.document?.body4 || "",
      body5: props.document?.body5 || "",
      body6: props.document?.body6 || "",
      body7: props.document?.body7 || ""
    },
    employee: {
      name: props.employee?.name || "",
      employee_id: props.employee?.employee_id || "",
      date_of_join: props.employee?.date_of_join || "",
      date_of_relieving: props.employee?.date_of_relieving || "",
      designation: props.employee?.designation || "",
      reason_for_leaving: props.employee?.reason_for_leaving || "",
    },
    footer: {
      text1: props.footer?.text1 || "",
      text2: props.footer?.text2 || "",
      text3: props.footer?.text3 || "",
    },
    pageEnable: props.pageEnable || false,
    pageLabel: props.pageLabel || "Page",
  };

  const splitTextAndGetHeight = (text, size) => {
    var lines = doc.splitTextToSize(text, size);
    return {
      text: lines,
      height: doc.getTextDimensions(lines).h,
    };
  };

  const options = {
    orientation: param.orientationLandscape ? "landscape" : "",
    compress: param.compress
  };

  var doc = new jsPDF(options);

  var docWidth = doc.internal.pageSize.width;
  var docHeight = doc.internal.pageSize.height;

  var colorBlack = "#000000";
  var colorGray = "#4d4e53";
  //starting at 15mm
  var currentHeight = 15;
  //var startPointRectPanel1 = currentHeight + 6;

  var pdfConfig = {
    headerTextSize: 18,
    labelTextSize: 12,
    fieldTextSize: 10,
    lineHeight: 6,
    subLineHeight: 4,
  };

  doc.setFontSize(pdfConfig.headerTextSize);
  doc.setTextColor(colorBlack);
  doc.text(docWidth - 10, currentHeight, param.company.name, "right");
  doc.setFontSize(pdfConfig.fieldTextSize);

  if (param.logo.src) {
    var imageHeader = '';
    if (typeof window === "undefined") {
      imageHeader.src = param.logo.src;
    } else {
      imageHeader = new Image();
      imageHeader.src = param.logo.src;
    }
    //doc.text(htmlDoc.sessionDateText, docWidth - (doc.getTextWidth(htmlDoc.sessionDateText) + 10), currentHeight);
    if (param.logo.type)
      doc.addImage(
        imageHeader,
        param.logo.type,
        10 + param.logo.margin.left,
        currentHeight - 5 + param.logo.margin.top,
        param.logo.width,
        param.logo.height
      );
    else
      doc.addImage(
        imageHeader,
        10 + param.logo.margin.left,
        currentHeight - 5 + param.logo.margin.top,
        param.logo.width,
        param.logo.height
      );
  }

  doc.setTextColor(colorGray);

  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.company.address1, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.company.address2, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.company.phone, "right");
  doc.setFontSize(pdfConfig.fieldTextSize);
  // doc.setTextColor(colorGray);
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.company.email, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.company.email_1, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.company.website, "right");
  currentHeight += pdfConfig.subLineHeight;
  doc.text(docWidth - 10, currentHeight, param.company.pan, "right");

  currentHeight += pdfConfig.subLineHeight;
  doc.line(10, currentHeight, docWidth - 10, currentHeight);

  //Document label part
  doc.setTextColor(colorGray);
  doc.setFontSize(pdfConfig.fieldTextSize);
  currentHeight += pdfConfig.lineHeight;

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize);
  currentHeight += pdfConfig.subLineHeight;
  if (param.document.label) doc.text(docWidth / 2, currentHeight, param.document.label, 'center');

  currentHeight += 1;
  const textWidth = doc.getTextWidth(param.document.label);
  doc.line(docWidth / 2.75, currentHeight, 75 + textWidth, currentHeight)

  //end Document label part
  //#endregion

  //Document Body part
  currentHeight += pdfConfig.lineHeight * 2;

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  if (param.document.body1 && param.document.body2 && param.document.body3 && param.document.body4) {
    var lines = doc.splitTextToSize(param.document.body1 + param.employee.name + param.document.body2 + param.employee.date_of_join + param.document.body3 + param.employee.date_of_relieving + param.document.body4 + param.employee.designation + '.', docWidth - 10);
    doc.text(docWidth / 2, currentHeight, lines, 'center');
  }

  currentHeight += pdfConfig.lineHeight * 3;

  doc.text(50, currentHeight, `Employee Name\t\t: ` + param.employee.name);
  currentHeight += pdfConfig.lineHeight * 1.5;
  doc.text(50, currentHeight, `Employee ID\t\t      : ` + param.employee.employee_id);
  currentHeight += pdfConfig.lineHeight * 1.5;
  doc.text(50, currentHeight, `Date of Joining\t\t   : ` + param.employee.date_of_join);
  currentHeight += pdfConfig.lineHeight * 1.5;
  doc.text(50, currentHeight, `Date of Relieving\t\t: ` + param.employee.date_of_relieving);
  currentHeight += pdfConfig.lineHeight * 1.5;
  doc.text(50, currentHeight, `Reason for Leaving\t    : ` + param.employee.reason_for_leaving);
  currentHeight += pdfConfig.lineHeight * 1.5;
  doc.text(50, currentHeight, `Designation\t\t\t: ` + param.employee.designation);
  currentHeight += pdfConfig.lineHeight * 3;

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  if (param.document.body5) {
    var lines = doc.splitTextToSize(param.document.body5, docWidth - 10);
    doc.text(docWidth / 2, currentHeight, lines, 'center');
  }

  currentHeight += pdfConfig.lineHeight * 3;

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  if (param.document.body6) {
    var lines = doc.splitTextToSize(param.document.body6 + param.employee.name + param.document.body7, docWidth - 10);
    doc.text(docWidth / 2, currentHeight, lines, 'center');
  }

  //end Document Body part
  //#endregion

  //Signature part
  currentHeight += pdfConfig.lineHeight * 3;

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  if (param.company.name) {
    var lines = doc.splitTextToSize(`For ` + param.company.name);
    doc.text(15, currentHeight, lines);
  }
  currentHeight += pdfConfig.lineHeight*2;

  if (param.signature.sign_img_src) {
    var signImage = ''
    if (typeof window === "undefined") {
      signImage.src = param.signature.sign_img_src;
    } else {
      signImage = new Image()
      signImage.src = param.signature.sign_img_src;
    }
    //doc.text(htmlDoc.sessionDateText, docWidth - (doc.getTextWidth(htmlDoc.sessionDateText) + 10), currentHeight);
    if (param.logo.type)
      doc.addImage(
        signImage,
        param.logo.type,
        10 + param.logo.margin.left,
        currentHeight - 5 + param.logo.margin.top,
        param.logo.width,
        param.logo.height
      );
    else
      doc.addImage(
        signImage,
        10 + param.logo.margin.left,
        currentHeight - 5 + param.logo.margin.top,
        param.logo.width,
        param.logo.height
      );
  }

  currentHeight += pdfConfig.lineHeight*2;
  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.headerTextSize - 5);
  if (param.signature.name) {
    var lines = doc.splitTextToSize(param.signature.name);
    doc.text(15, currentHeight, lines);
  }
  currentHeight += pdfConfig.lineHeight;
  if (param.signature.designation) {
    var lines = doc.splitTextToSize(param.signature.designation);
    doc.text(15, currentHeight, lines);
  }

  //end Document Body part
  //#endregion

  //#region Stamp
  var addStamp = () => {
    let _addStampBase = () => {
      var stampImage = '';
      if (typeof window === "undefined") {
        stampImage.src = param.stamp.src;
      } else {
        stampImage = new Image();
        stampImage.src = param.stamp.src;
      }

      if (param.stamp.type)
        doc.addImage(
          stampImage,
          param.stamp.type,
          10 + param.stamp.margin.left,
          docHeight - 22 + param.stamp.margin.top,
          param.stamp.width,
          param.stamp.height
        );
      else
        doc.addImage(
          stampImage,
          10 + param.stamp.margin.left,
          docHeight - 22 + param.stamp.margin.top,
          param.stamp.width,
          param.stamp.height
        );
    };

    if (param.stamp.src) {
      if (param.stamp.inAllPages)
        _addStampBase();
      else if (!param.stamp.inAllPages && doc.getCurrentPageInfo().pageNumber == doc.getNumberOfPages())
        _addStampBase();
    }
  }
  //#endregion

  doc.setTextColor(colorBlack);
  doc.setFontSize(pdfConfig.labelTextSize);
  currentHeight += pdfConfig.lineHeight;

  doc.setTextColor(colorBlack);
  currentHeight += pdfConfig.subLineHeight;
  currentHeight += pdfConfig.subLineHeight;
  //   currentHeight += pdfConfig.subLineHeight;
  doc.setFontSize(pdfConfig.labelTextSize);

  //#region Add num of pages at the bottom
  if (doc.getNumberOfPages() > 1) {
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setFontSize(pdfConfig.fieldTextSize - 2);
      doc.setTextColor(colorGray);

      if (param.pageEnable) {
        doc.text(docWidth / 2, docHeight - 10, param.footer.text2, "center");
        doc.setPage(i);
        doc.text(
          param.pageLabel + " " + i + " / " + doc.getNumberOfPages(),
          docWidth - 20,
          doc.internal.pageSize.height - 6
        );
      }
      addStamp();
    }
  }
  //#endregion

  addStamp();

  //#region Add num of first page at the bottom
  if (doc.getNumberOfPages() === 1 && param.pageEnable) {
    doc.setFontSize(pdfConfig.fieldTextSize - 2);
    doc.setTextColor(colorGray);

    doc.text(docWidth / 2, docHeight - 30, param.footer.text1 + param.company.email_1, "center");
    doc.line(10, docHeight - 25, docWidth - 10, docHeight - 25);
    var lines = doc.splitTextToSize(param.footer.text2 + param.company.name + param.company.address1 + param.company.address2 + '.', docWidth - 10);
    doc.text(docWidth / 2, docHeight - 20, lines, 'center');
    doc.text(docWidth / 2, docHeight - 10, param.footer.text3, "center");
    doc.text(
      param.pageLabel + "1 / 1",
      docWidth - 20,
      doc.internal.pageSize.height - 6
    );
  }
  //#endregion

  let returnObj = {
    pagesNumber: doc.getNumberOfPages(),
  };

  if (param.returnJsPDFDocObject) {
    returnObj = {
      ...returnObj,
      jsPDFDocObject: doc,
    };
  }

  if (param.outputType === "save") doc.save(param.employee.name + "_" + props.fileName + "_" + param.employee.employee_id + ".pdf");
  else if (param.outputType === "blob") {
    const blobOutput = doc.output("blob");
    returnObj = {
      ...returnObj,
      blob: blobOutput,
    };
  } else if (param.outputType === "datauristring") {
    returnObj = {
      ...returnObj,
      dataUriString: doc.output("datauristring", {
        filename: param.fileName,
      }),
    };
  } else if (param.outputType === "arraybuffer") {
    returnObj = {
      ...returnObj,
      arrayBuffer: doc.output("arraybuffer"),
    };
  } else
    doc.output(param.outputType, {
      filename: param.employee.name + props.fileName + param.employee.employee_id,
    });

  return returnObj;
} //returns number of pages created

module.exports = { jsPDFInvoiceTemplate, OutputType }