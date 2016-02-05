/**
 * Created by M_Zabiyakin on 04.02.2016.
 */
function IsCriticalCount(cartrigeName, cartrigeCount) {
    switch (cartrigeName) {
        case "TK-1140":
            return cartrigeCount < 3;
            break;
        case "TK-350":
            return cartrigeCount < 3;
            break;
        case "TK-6305":
            return cartrigeCount < 3;
            break;
        case "C4129x":
            return cartrigeCount < 3;
            break;
        case "CB436A":
            return cartrigeCount < 3;
            break;
        case "Q2612A":
            return cartrigeCount < 3;
            break;
        case "TK-685":
            return cartrigeCount < 3;
            break;
        case "TK-170":
            return cartrigeCount < 3;
            break;
        case "TK-435":
            return cartrigeCount < 3;
            break;
        case "Q7516A":
            return cartrigeCount < 3;
            break;
        case "CE278A":
            return cartrigeCount < 3;
            break;
        case "Q7553A":
            return cartrigeCount < 3;
            break;
        case "TK-895":
            return cartrigeCount < 3;
            break;
        default:
            return false;
    }
}