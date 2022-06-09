import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { dbService } from "../firebase"

export const hospitalRegisterHandler = (hospitalName, hospitalTel, email, password, fullAddress, extraAddress, zoneCode) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(dbService, "hospital", user),{
            hospitalName: hospitalName,
            hospitalTel: hospitalTel,
            address: fullAddress + " " + extraAddress,
            zoneCode: zoneCode,
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMassage = error.message;
        console.log(errorCode, errorMassage);
    })
}

// export const hospitalRegisterHandler = (hospitalName, hospitalTel, email, password, fullAddress, extraAddress) => {
//     authService.createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         const uid = userCredential.user;
//         dbService.collection("hosiptal").doc(uid).set(
//             {
//                 hospitalName: hospitalName,
//                 hospitalTel: hospitalTel,
//                 address: fullAddress + " " + extraAddress,
//                 id: uid,
//             }
//         ).then(() => {
//             console.log('DB 저장성공')
//         }).catch((error) => {
//             console.error('DB 저장실패', error)
//         })
//     })
// }