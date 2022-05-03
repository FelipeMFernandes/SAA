function selectPanel ($item) {
    $(".sidebar-tab").removeClass("sidebar-tab-selected");
    $($item).addClass("sidebar-tab-selected");
    $(".sidebar-content").children().css("display", "none");
    $("#" + $item.id.split("-")[1]).css("display", "block");
}

function openPanel () {
    $(".sidebar").addClass('sidebar-expanded');
    console.log("abrindo")
    $("#sidebar-icon").attr("onclick","closePanel();");
    $("#sidebar-icon").attr("title","Fechar painel");
    $("#sidebar-icon").html("<i class='material-icons'>arrow_forward</i>");
    $(".sidebar-content").css("display", "block");
    selectPanel(document.getElementById("sidebar-attributions"))
}

function closePanel () {
    console.log("fechando")
    $(".sidebar").removeClass('sidebar-expanded');
    $("#sidebar-icon").attr("onclick","openPanel();");
    $("#sidebar-icon").attr("title","Abrir painel");
    $("#sidebar-icon").html("<i class='material-icons'>arrow_back</i>");
    $(".sidebar-content").css("display", "none");
}