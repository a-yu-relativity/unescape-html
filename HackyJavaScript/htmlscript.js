
/*
 * Converts the element's innerHTML to its innerText
 */  
function innerTextToHtml(element) {
    var text = element.innerText;
    element.innerHTML = text;
}


/*
 * Is this string an HTML element? 
 */ 
function isHtmlString(s) {
    return s.startsWith("<") && s.endsWith(">");
}


/*
 * Search for review queue list table,
 * returning null if not found
 */  
function getTable() {

    // find iFrame
    const iFrameTableIdDocked = "_tableViewFrameDocked";
    const iFrameTableIdUndocked = "_tableViewFrameUnDocked";
    var iFrameTableEl = top.document.getElementById(iFrameTableIdDocked);
    if (iFrameTableEl === null) {
        // try undocked
        iFrameTableEl = top.document.getElementById(iFrameTableIdUndocked);
        if (iFrameTableEl === null) {
            console.log("Could not get review queue.");
            return null;
        }  
    }

    var parentDoc = iFrameTableEl.contentDocument;

    // try by ID
    const id = "_reviewqueuelist_ctl00_itemList_listTable";
    var element = parentDoc.getElementById(id);
    if (element !== undefined && element !== null) {
        return element;
    }

    // try to find by tag/class name
    const tableClass = "itemTable lock-header";
    var tables = parentDoc.getElementsByTagName("table");
    var tableArr = Array.from(tables);
    targetTables = tableArr.filter(el => el.className === tableClass);
    if (targetTables.length === 1) {
        return targetTables[0];
    }

    // return null if not found
    return null;
}


/*
 * Transforms the table's cells into HTML if 
 * the innerText property looks like HTML
 */
function transformIntoHtml() {
    var tbl = getTable();

    if (tbl === null) {
        console.log("Could not get table.");
        return;
    }

    if (tbl.tBodies.length !== 1) {
        console.log("Either zero or more than one tBodies. Probably found wrong table?");
        return;
    }

    // iterate through cells, applying the transformation
    var tBody = tbl.tBodies[0];
    for (var i = 0; i < tBody.children.length; i++) {
        var row = tBody.children[i];
        for (var j = 0; j < row.children.length; j++) {
            var col = row.children[j];
            var textInner = col.innerText;
            if (isHtmlString(textInner)) {
                col.innerHTML = textInner;
            }
        }
    }
}


/*
 * Renders plaintext as proper HTML
 */ 
function hackyPiehStartup() {
    // todo: add onloaded event handler for iFrames
    transformIntoHtml();
}


hackyPiehStartup();