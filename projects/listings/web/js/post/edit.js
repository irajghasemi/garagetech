(function($, undefined) {

    function limitMaxLength($formElem, $countElem) {
        $formElem.limitMaxLength({
            onEdit: function(remaining) {
                switch (remaining) {
                    case 1:
                        $countElem.html(remaining + " character remaining");
                        break;
                    default:
                        $countElem.html(remaining + " characters remaining");
                        break;
                }
                if (remaining > 0) {
                    $countElem.removeClass("error");
                }
            },
            onLimit: function() {
                $countElem.addClass("error");
            }
        });
    }

    function initAttributeEditor() {
        $("#newAttribute").click(function(e) {
            e.preventDefault();
            newAttribute();
        });
        $(".editor-row span.delete a", ".complex").live("click", function(e) {
            e.preventDefault();
            deleteAttribute($(this));
        });
    }

    function newAttribute() {
        var next = updateIndices();
        $("#attributeEditor").append(ich.newAttributeTmpl({ idx: next }));
        // The backslashes are key to making the selector work here
        $("#attributes\\[" + next + "\\]\\.name").focus();
    }

    function deleteAttribute($elem) {
        var $parent = $elem.parents(".editor-row");
        $elem.die("click");
        // Using jQuery $elem.remove doesn't seem to work
        $("#attributeEditor")[0].removeChild($parent[0]);
        updateIndices();
    }

    function updateIndices() {
        var current, idx = -1, $input, $inputs, suffix;
        $(".editor-row", ".complex").each(function(i) {
            $inputs = $(this).find("input[type=text]");
            $($inputs).each(function(j, input) {
                $input = $(input);
                suffix = $input.attr("name").split(".")[1];
                current = "attributes[" + i + "]." + suffix;
                $input.attr("name", current).attr("id", current);
            });
            idx = i;
        });
        return idx + 1;
    }

    $(function() {
        limitMaxLength($("#content"), $("#contentCounter"));
        limitMaxLength($("#summary"), $("#summaryCounter"));
        initAttributeEditor();
    });

}(jQuery));