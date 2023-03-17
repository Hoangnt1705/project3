const { Class, Users, Course, Learn, Doc, PoolDocCompleted } = require('../service/tableSequelize');


module.exports.test = async (req, res, next) => {
    const userId = req.user.id; // assuming that the user ID is stored in req.user.id
    try {
        const learnData = await Learn.findAll({
            include: [{ model: Doc }],
        });
        const learnDataRender = await Learn.findAll();
        const courseData = await Course.findAll();
        const docData = await Doc.findAll({
            where: { course_id: 1, learn_id: learnData.map((learn) => learn.id_learn) }
        });
        const completedDocs = await PoolDocCompleted.findAll({
            where: { learn_id: learnData.map((learn) => learn.id_learn), course_id: 1, user_id: userId }, // Có thể
            // dùng array để xử lý điều kiện where để truy xuất dữ liệu với sequelize
            attributes: ['docIdDoc'],
        });
        const completedDocIds = completedDocs.map((doc) => doc.docIdDoc);
        const lessonReadings = docData.map((doc) => doc.dataValues);
        lessonReadings.sort((a, b) => a.id_doc - b.id_doc);
        const currentDoc = lessonReadings.find((doc) => !completedDocIds.includes(doc.id_doc));
        const currentIndex = lessonReadings.indexOf(currentDoc);
        const unlocked = lessonReadings.slice(0, currentIndex + 1).map((doc) => ({
            ...doc,
            locked: false,
        }));
        const locked = lessonReadings.slice(currentIndex + 1).map((doc) => ({
            ...doc,
            locked: true,
        }));
        // ...operator là coppy từng phần tử trong 1 mảng vd: trong [] nếu dùng ... sẽ lấy ra từng obj, obj, obj, ...
        let a = [...unlocked, ...locked];
        const userData = {
            userId: userId,
            lessonReadings: a,
        };
        let c = courseData.map(element => element.dataValues);
        let d = learnDataRender.map(element => element.dataValues);
        console.log(d);



 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    // const userId = req.user.id; // assuming that the user ID is stored in req.user.id
    // try {
    //     const learnData = await Learn.findAll({
    //         include: [{ model: Doc }],
    //     });

    //     const completedDocs = await PoolDocCompleted.findAll({
    //         where: { learn_id: learnData.map((learn) => learn.id_learn), user_id: userId }, // có thể 
    //         // dùng array để xử lý điều kiện where để truy xuất dữ liệu với sequelize
    //         attributes: ['docIdDoc'],
    //     });
    //     const completedDocIds = completedDocs.map((doc) => doc.docIdDoc);
    //     const lessonReadings = learnData.map((lesson) => {
    //         const readings = lesson.docs.map((doc) => doc.dataValues);
    //         readings.sort((a, b) => a.id_doc - b.id_doc);
    //         const currentDoc = readings.find((doc) => !completedDocIds.includes(doc.id_doc));
    //         const currentIndex = readings.indexOf(currentDoc);


    //         const unlocked = readings.slice(0, currentIndex + 1).map((doc) => ({
    //             ...doc,
    //             locked: false,
    //         }));
    //         const locked = readings.slice(currentIndex + 1).map((doc) => ({
    //             ...doc,
    //             locked: true,
    //         }));

    //         return [...unlocked, ...locked];
    //     });
    //     const userData = {
    //         userId: userId,
    //         lessonReadings: lessonReadings,
    //     }
    //     console.log(userData.lessonReadings);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send('Internal Server Error');
    // }
};







   // const lessonReadings = learnData.map((lesson) => {
        //     const readings = lesson.docs.map((doc) => doc.dataValues);
        //     readings.sort((a, b) => a.id_doc - b.id_doc);
        //     const currentDoc = readings.find((doc) => !completedDocIds.includes(doc.id_doc));
        //     const currentIndex = readings.indexOf(currentDoc);
        //     // console.log(currentIndex);

        //     const unlocked = readings.slice(0, currentIndex).map((doc) => ({
        //         ...doc,
        //         locked: false,
        //     }));
        //     const locked = readings.slice(currentIndex).map((doc) => ({
        //         ...doc,
        //         locked: true,
        //     }))
        //     return [...unlocked, ...locked];
        // })

        // console.log(userData.lessonReadings);

        // console.log(userData.lessonReadings);











// module.exports.test = (req, res, next) => {
//     Learn.findAll({
//         include: [
//             {
//                 model: Doc,
//             }
//         ]
//     })
//         .then(responseDoc => {
//             let learnData = responseDoc.map(element => element.dataValues);
//             PoolDocCompleted.findAll()
//                 .then(responsePool => {
//                     let completedDocs = responsePool.map(completedDoc => completedDoc.dataValues);
//                     // console.log(completedDocIds);
//                     const completedDocIds = completedDocs.filter(completedDoc => learnData.some(elementLearn =>
//                         elementLearn.id_learn === completedDoc.learn_id))
//                         .map(completedDoc => completedDoc.docIdDoc);
//                     console.log(completedDocIds);
//                     //
//                     for (const learn of learnData) {
//                         let learnParse = learn.docs.map(element => element.dataValues);
//                         let learnParseGetId = learnParse.map(element => element.id_doc);
//                         learnParseGetId.sort((a, b) => a - b);
//                         const currentDoc = learnParseGetId.find(doc => !completedDocIds.includes(doc));
//                         if (!currentDoc) {
//                             continue;
//                         }
//                         let learnCompareCurrentDoc = learnParse.map(element => element);
//                         for (let i = 0; i < learnCompareCurrentDoc.length; i++) {
//                             if (learnCompareCurrentDoc[i].id_doc === currentDoc) {
//                                 const previousDocId = learnCompareCurrentDoc[i].id_doc - 1;
//                                 console.log(learnCompareCurrentDoc[i].id_doc);
//                             };
//                         };
//                     };
//                 })
//                 .catch(err => console.log(err));
//         })
//         .catch(err => console.log(err));
// }





    // const previousDocCompleted = previousDocId === 0 || completedDocs.some(completedDoc => completedDoc.docIdDoc === previousDocId
    //     && completedDoc.learn_id === currentDoc.learnIdLearn && completedDoc.userId === currentDoc.user_id)
    // console.log("previousDocCompletedA", previousDocCompleted);
    // console.log("previousDocCompletedB", currentDoc.learnIdLearn);
    // console.log("previousDocCompletedC", currentDoc.user_id);
    // if (!previousDocCompleted) {
    //     console.log(`You must complete the previous document before starting the ${currentDoc.doc_name} document`);
    // }
    // return console.log(`1 ${currentDoc.doc_name}`);


 // let learnData = responseDoc.map(element => element.dataValues);
            // let learnDataParse = learnData.map(element => element.docs[0]);
            // let learnParseDocs = learnDataParse.map(element => element);
            // // for (let i = 0; i < learnParseDocs.length; i++) {
            // //     learnParseDocs[i] ? console.log(learnParseDocs[i].dataValues) : "";
            // // }