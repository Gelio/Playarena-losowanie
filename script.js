function blad(tresc)
{
    $("div#errorMessage").show().text(tresc);
    return true;
}

function resetujBlad()
{
    $("div#errorMessage").hide();
    return true;
}

function initial()
{
    $("button#losuj").click(losuj);
    $("button#reset").click(reset);
}

function losuj()
{
    var druzyny = $("textarea#inputs").val().split("\n");
    if(druzyny.length < 16) {
        blad("Zbyt mała liczba drużyn, należy wpisać 16.");
        return true;
    }

    
    resetujBlad();
}

function reset()
{
    $("textarea#inputs").val("");
    $("span.druzynaPicked").text("?");
    $("span.druzynaPicked").removeClass("druzynaPicked");
    resetujBlad();
}

window.onload = initial;