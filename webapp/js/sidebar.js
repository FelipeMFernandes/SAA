function selectPanel ($item) {
    $(".sidebar-tab").removeClass("sidebar-tab-selected");
    $($item).addClass("sidebar-tab-selected");
    $(".sidebar-content").children().css("display", "none");
    $("#" + $item.id.split("-")[1]).css("display", "block");
}

async function openPanel () {
    $("#map").css("width", "calc(100vw - 350px)");
    $(".sidebar").addClass('sidebar-expanded');
    $("#sidebar-icon").attr("onclick","closePanel();");
    $("#sidebar-icon").attr("title","Fechar painel");
    $("#sidebar-icon").html("<i class='material-icons'>arrow_forward</i>");
    await new Promise(r => setTimeout(r, 250));
    $(".sidebar-content").css("display", "block");
    selectPanel(document.getElementById("sidebar-attributions"));
}

async function closePanel () {
    $("#map").css("width", "calc(100vw - 50px)");
    $(".sidebar").removeClass('sidebar-expanded');
    $("#sidebar-icon").attr("onclick","openPanel();");
    $("#sidebar-icon").attr("title","Abrir painel");
    $("#sidebar-icon").html("<i class='material-icons'>arrow_back</i>");
    $(".sidebar-content").css("display", "none");
}