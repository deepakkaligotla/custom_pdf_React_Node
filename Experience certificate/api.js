const express = require('express')
const router = express.Router()
const { jsPDFInvoiceTemplate, OutputType } = require('./ExperienceCertificate')

router.post('/new_exp_certi', async (request, response) => {
    var props = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: "Experience Certificate",
        orientationLandscape: false,
        compress: true,
        logo: {
            src: request.body.company.company_logo_src,
            type: 'JPEG',
            width: 53.33,
            height: 26.66,
            margin: {
                top: 0,
                left: 0
            }
        },
        stamp: {
            inAllPages: true,
            src: request.body.stamp.stamp_img_src,
            type: 'PNG',
            width: 20,
            height: 20,
            margin: {
                top: 0,
                left: 0
            }
        },
        company: {
            name: request.body.company.name,
            address1: request.body.company.address1,
            address2: request.body.company.address2,
            phone: request.body.company.phone,
            email: request.body.company.email,
            email_1: request.body.company.email1,
            website: request.body.company.website,
            pan: request.body.company.pan,
        },
        signature: {
            sign_img_src: request.body.signature.sign_img_src,
            name: request.body.signature.name,
            designation: request.body.signature.designation
        },
        document: {
            label: "Experience Certificate",
            body1: `This is to certify that `,
            body2: ` was employed with us for the period of `,
            body3: ` to `,
            body4: ` on part time basis and designated as `,
            body5: `He is been a crucial part in getting profits to company by developing a portoflio Website & Mobile Application by running adcampigns on Google Ads + facebook instagram Ads.`,
            body6: `We highly recommend and wish  `,
            body7: ` all the best in his future endeavors.`
        },
        employee: {
            name: request.body.employee.name,
            employee_id: request.body.employee.employee_id,
            date_of_join: request.body.employee.date_of_join,
            date_of_relieving: request.body.employee.date_of_relieving,
            designation: request.body.employee.designation,
            reason_for_leaving: request.body.employee.reason_for_leaving
        },
        footer: {
            text1: "This letter is also available in our database for background verification. Please send your request to ",
            text2: "Regd. Office : ",
            text3: "This is system generated document with scanned signature by authorized signatory does not require company Seal.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };
    jsPDFInvoiceTemplate(props)
    response.status(200).send('Experience Certificate Generated')
})

module.exports = router