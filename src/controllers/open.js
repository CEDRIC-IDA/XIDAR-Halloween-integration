import {xidarAPI} from "../config/variables";
import {xidarEncryptionKey} from "../config/keys";
import {decryptSymmetric, encryptSymmetric} from "../helpers/encryption";

export const open = (uniqId, popInstant, openInstant) => {
    return new Promise(async (resolve) => {
        const encryptedMessage = await encryptSymmetric(
            JSON.stringify({
                "uniqId": uniqId,
                "popInstant": popInstant,
                "openInstant": openInstant,
            }),
            xidarEncryptionKey
        );

        const headers = {
            "Content-Type": "application/json",
            "Halloween-Iv": encryptedMessage.iv
        }

        fetch(
            xidarAPI + '/halloween-open',
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    data: encryptedMessage.ciphertext
                }),
            })
            .then(response => response.json())
            .then(async data => {
                resolve(JSON.parse(await decryptSymmetric(data.data, encryptedMessage.iv, xidarEncryptionKey)));
            })
            .catch(error => {
                resolve(null);
            });
    })
}
