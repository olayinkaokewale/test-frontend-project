

export default class Validator {

    static isValid(input="", min=1, max=null) {
        const str = (input != null && input != undefined) ? String(input).trim() : "";
        if (str.length >= min && ((max != null && str.length <= max) || true)) return true;
        return false; // otherwise
    }

    static isEmptyArray(arr=[]) {
        if (arr != undefined && arr != null && typeof arr == "object" && arr.length > 0) return false;
        return true; // otherwise
    }

    static isValidEmail(str="") {
        const email = String(str).trim();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    static isValidPhoneNumber(str="") {
        let phoneNumber = String(str).trim();
        phoneNumber = (phoneNumber.startsWith("0")) ? phoneNumber : `0${phoneNumber}`;
        const phoneno = /^\d{11}$/;
        return phoneno.test(phoneNumber);
    }

}