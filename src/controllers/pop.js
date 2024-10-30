import {xidarAPI} from "../config/variables";
import {xidarEncryptionKey} from "../config/keys";
import {decryptSymmetric, encryptSymmetric} from "../helpers/encryption";

export const pop = () => {
    return new Promise(async (resolve) => {
        const encryptedMessage = await encryptSymmetric(
            JSON.stringify({
                "path": window.location.pathname,
                "host": window.location.hostname
            }),
            xidarEncryptionKey
        );

        const headers = {
            "Content-Type": "application/json",
            "Halloween-Iv": encryptedMessage.iv
        }

        fetch(
            xidarAPI + '/halloween-pop',
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
