const mongoose = require('mongoose');
const Receipt = require('../models/receipt');
const Tesseract = require('tesseract.js')

const Item = require('../models/item');
const Area = require('../models/area');

exports.receipt_add = async(req, res, next) => { 
    try {
        const worker = Tesseract.createWorker();
        await worker.load();
        await worker.loadLanguage("lit");
        await worker.initialize("lit");
        //let { data: { text } } = await worker.recognize(req.file.buffer);

        //console.log(text)
        text = `
V | | kV | }
1Ą Yy į Ė 4 Ya |
k / = | |T I
KAXIMA LT, UAB
Liegajus a. 10, Klaipėda, Kasa Nr. 13
UVH nokėtašo kodas LT230335113       
Kvitas 157/1162 800789086
Duona DOMIPAN su sėklonis 1,35 A
Nuolaida -0,67 A '
Speltos kviečių Diltų DUONIUKAI
0,85 X 3 vnt. 2.55 A
Nuolaida sassssasto s A M j :U.?lfe
uuummarne |
PVK Be PVH Šu PVK
9321;99%____„____9;32,___.____.._2:99„_,__„_____2;.42 *
Moket1242
Mokėta (9rynaisiais) 5,00
Grąža (grynaisiais) 2,58
AčIū kortelė 944000*********4404 ų
Iš viso KAXIMOS PINIGŲ už kvitą 0,02 ų
MAXIMOS PINIGŲ Tikutis 0,29 t
"r'llwf_lof'ūiolmillll II
'!!!013116u!|!,0
AčIū, KAD PIRKOTE! |
*Daugiau informacijos Ssužinokite
YWw.naxima.lt arba telefonu 8 800 20050
Kasininkas (-ė) 11713
£7 JB 000000484395 2020 03 16 12:35:53
        `
        console.log(req.userData.uid)
        user_id = req.userData.uid
        _id = new mongoose.Types.ObjectId()

        text = text.split(/[Kk]vitas.*\n/)[1].split(/[Mm]ok[eė]t/)[0]
        text = text.split("\n").join(" ").split(/(\d+[,\.]\d+)/g)

        //let res = []
        let total_all = 0
        let i = 0;
        while (i < text.length) {
            let discount
            let vnt
            let price
            let tmp = text[i++];
            let name = tmp;
            tmp = text[i++];
            let one_price = tmp.replace(/,/g, ".");
            tmp = text[i++];
            if(/[Vv]nt/.test(tmp)){
                vnt = /\d+/.exec(tmp)[0].replace(/,/g, ".");
                tmp = text[i++];
                price = vnt * one_price
                tmp = text[i++];
            }
            else{
                vnt = 1;
                price = one_price
            }
            if(/[Nn]uolaida/.test(tmp)){
                tmp = text[i++];
                if(tmp) discount = tmp.replace(/,/g, ".");
                else {
                    discount = 0
                }
            }
            else {
                discount = 0
            }
            const aaa = {
                _id: new mongoose.Types.ObjectId(),
                name: name,
                one_price: one_price,
                vnt: vnt,
                price: price,
                discount: discount,
                total: price - discount,
                receipt: _id
            }
            total_all += aaa.total
            const new_item = await new Item(aaa).save()
            //console.log(new_item)
        }

        const area = req.body.area
        if(!area) return res.status(400).json({error: "No area specified"});
        console.log(area)
        const db_area = await Area.findOne({_id: area})
        if(!db_area) return res.status(400).json({error: "No area with this id"});

        const new_reiept = await new Receipt({
            _id: _id,
            user: user_id,
            date: new Date(),
            area: area,
            price: total_all
        }).save()
        return res.status(201).json({response: new_reiept})
    } catch (error) {
        return res.status(999).json({
            error: error
        });
    }
};

exports.receipt_get_all = async(req, res, next) => {
    try {
        const db_receipts = await Receipt.find()
        return res.status(200).json({
            response: db_receipts
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.receipt_get = async(req, res, next) => {
    try {
        const id = req.params.receiptId;
        const receipt = await Receipt.findOne({_id: id})
        const items = await Item.find({receipt: id})
        return res.status(200).json({
            receipt: receipt,
            items: items
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.receipt_remove = async(req, res, next) => {
    try {
        const id = req.params.receiptId;
        items = await Item.remove({receipt: id});
        receipt = await Receipt.remove({_id: id});
        return res.status(200).json({
            receipt: receipt,
            items: items
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.receipt_remove_all = async(req, res, next) => {
    try {
        items = await Item.remove({});
        receipt = await Receipt.remove({});
        return res.status(200).json({
            receipt: receipt,
            items: items
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.receipt_edit = async(req, res, next) => {
    try {
        const id = req.params.receiptId;
        const items = req.body.items;
        items.forEach(async item => {
            const total = item.one_price * item.vnt - item.discount
            item["total"] = total
            await Item.findOneAndUpdate({_id: item._id}, item)
        });
        let full_price = 0
        const db_items = await Item.find({receipt: id})
        db_items.forEach(item => {
            full_price += item.total
        });
        const db_receipt = await Receipt.findOneAndUpdate({_id: id}, {price: full_price})
        return res.status(200).json(db_receipt)
    } catch (error) {return res.status(500).json({error: error});}
};

exports.user_receipt_get_all = async(req, res, next) => {
    u_id = req.params.userId;
    try {
        const db_receipts = await Receipt.find({user: u_id})
        return res.status(200).json({
            response: db_receipts
        })
    } catch (error) {return res.status(500).json({error: error});}
};

exports.user_area_receipt_get_all = async(req, res, next) => {
    u_id = req.params.userId;
    a_id = req.params.areaId;
    try {
        const db_receipts = await Receipt.find({user: u_id, area: a_id})
        return res.status(200).json({
            response: db_receipts
        })
    } catch (error) {return res.status(500).json({error: error});}
};