function triangle(v1, t1, v2, t2) {
    const types = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!types.includes(t1) || !types.includes(t2)) {
        console.log("Невірний тип. Перечитайте інструкцію.");
        return "failed";
    }

    const MIN = 1e-6;
    const MAX = 1e6;
    if (v1 < MIN || v2 < MIN || v1 > MAX || v2 > MAX)
        return "Некоректні значення";

    let a, b, c, alpha, beta;

    //leg + hypotenuse
    if (
        (t1 === "leg" && t2 === "hypotenuse") ||
        (t2 === "leg" && t1 === "hypotenuse")
    ) {
        a = (t1 === "leg") ? v1 : v2;
        c = (t1 === "hypotenuse") ? v1 : v2;

        if (a >= c) return "Катет не може бути більший або рівний гіпотенузі";

        b = Math.sqrt(c * c - a * a);
        alpha = radToDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }


    //leg + leg 
    else if (t1 === "leg" && t2 === "leg") {
        a = v1;
        b = v2;
        c = Math.sqrt(a * a + b * b);

        alpha = radToDeg(Math.atan(a / b));
        beta = 90 - alpha;
    }

    //leg + adjacent angle
    else if (
        (t1 === "leg" && t2 === "adjacent angle") ||
        (t2 === "leg" && t1 === "adjacent angle")
    ) {
        a = (t1 === "leg") ? v1 : v2;
        alpha = (t1 === "adjacent angle") ? v1 : v2;

        if (alpha <= 0 || alpha >= 90) return "Кут має бути гострим";

        c = a / Math.cos(degToRad(alpha));
        if (!isFinite(c) || c <= a) return "Некоректне співвідношення";

        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }

    //leg + opposite angle  
    else if (
        (t1 === "leg" && t2 === "opposite angle") ||
        (t2 === "leg" && t1 === "opposite angle")
    ) {
        a = (t1 === "leg") ? v1 : v2;
        alpha = (t1 === "opposite angle") ? v1 : v2;

        if (alpha <= 0 || alpha >= 90) return "Кут має бути гострим";

        c = a / Math.sin(degToRad(alpha));
        if (!isFinite(c) || c <= a) return "Некоректне співвідношення";

        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }

    //hypotenuse + angle
    else if (
        (t1 === "hypotenuse" && t2 === "angle") ||
        (t2 === "hypotenuse" && t1 === "angle")
    ) {
        c = (t1 === "hypotenuse") ? v1 : v2;
        alpha = (t1 === "angle") ? v1 : v2;

        if (alpha <= 0 || alpha >= 90) return "Кут має бути гострим";

        a = c * Math.sin(degToRad(alpha));
        b = c * Math.cos(degToRad(alpha));
        beta = 90 - alpha;
    }

    else {
        console.log("Несумісна пара типів. Перечитайте інструкцію.");
        return "failed";
    }

    console.log("a =", a.toFixed(3));
    console.log("b =", b.toFixed(3));
    console.log("c =", c.toFixed(3));
    console.log("alpha =", alpha.toFixed(2));
    console.log("beta =", beta.toFixed(2));

    return "success";
}
