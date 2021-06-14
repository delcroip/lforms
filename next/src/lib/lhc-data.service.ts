import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * A data service for the form data object that is used by various components
 */
export class LhcDataService {

  private lhcFormData:any;

  constructor() { }

  getLhcFormData(): any {
    return this.lhcFormData;
  }

  setLhcFormData(data:any): void {
    this.lhcFormData = data;
  }


  /**
   * The following functions are exposed to components and their templates through a service
   */

  /**
   * Set the active row in table
   * @param index index of an item in the lforms form items array
   */
   setActiveRow(item) {
    this.lhcFormData.setActiveRow(item);
  }

  /**
   * Get the css class for the active row
   * @param item an item
   * @returns {string}
   */
  getActiveRowClass(item) {
    return this.lhcFormData.getActiveRowClass(item);
  }

  /**
   * Get an item's skip logic status
   * @param item an item
   * @returns {*|string}
   */
  getSkipLogicClass(item) {
    return this.lhcFormData.getSkipLogicClass(item);
  }

  /**
   * Get the CSS styles on a table column
   * @param col a column in a HTML table
   * @returns {{}} CSS style object
   */
  getTableColumnStyle(col) {
    var ret = {};
    if (col.displayControl && Array.isArray(col.displayControl.colCSS)) {
      var colCSS = col.displayControl.colCSS;
      for (var i= 0, iLen= colCSS.length; i<iLen; i++) {
        var css = colCSS[i];
        ret[ css.name ] = css.value;
      }
    }
    return ret;
  }


  /**
   * Get the CSS styles on an item itself
   * @param item an item in a form
   * @returns {{}} CSS style object
   */
  getItemStyle(item) {
    var ret = {};
    if (item.displayControl && Array.isArray(item.displayControl.css)) {
      for (var i= 0, iLen= item.displayControl.css.length; i<iLen; i++) {
        var css = item.displayControl.css[i];
        ret[ css.name ] = css.value;
      }
    }
    return ret;
  }



  /**
   * Get the indentation style of the form
   * @returns {string}
   */
  getIndentationStyle() {
    return this.lhcFormData.templateOptions.useTreeLineStyle ? "lf-indentation-tree" : "lf-indentation-bar";
  }
  
  /**
   * Check if there's only one repeating item in a group
   * (so that the 'remove' button won't show on this item)
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
  hasOneRepeatingItem(item) {
    var recCount = this.lhcFormData.getRepeatingItemCount(item);
    return recCount > 1 ? false : true;
  }


  /**
   * Check if the current horizontal table has one row only
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
   hasOneRepeatingRow(item) {
    var ret = false;
    var tableInfo = this.lhcFormData._horizontalTableInfo[item._codePath + item._parentIdPath_];
    if (tableInfo && tableInfo.tableRows && tableInfo.tableRows.length === 1) {
      ret = true;
    }
    return ret;
  }



  /**
   * Check the display type of the coding instructions
   * @param item an item in the lforms form items array
   * @returns {string}
   */
  getCodingInstructionsDisplayType(item) {
    var ret ='';
    if (item.codingInstructions && item.codingInstructions.length > 0) {
      var position = this.lhcFormData.templateOptions.showCodingInstruction ? "inline" : "popover";
      if (this.lhcFormData.templateOptions.allowHTMLInInstructions && item.codingInstructionsFormat === "html") {
        var format = "html";
      }
      else {
        format = "escaped";
      }
      ret = position + "-" + format;
    }
    return ret;
  }


  // /**
  //  * Get coding instructions with assumed safe HTML content
  //  * @param item an item in the lforms form items array
  //  * @returns {string}
  //  */
  // getTrustedCodingInstructions(item) {
  //   return item.codingInstructions ? $sce.trustAsHtml(item.codingInstructions) : ''
  // };

  /**
   * Check if the form is finished
   * @returns {boolean|*|*}
   */
  isFormDone() {
    return this.lhcFormData.isFormDone();
  }


  /**
   * Check if there's a unit list
   * @param item an item in the lforms form items array
   * @returns {boolean}
   */
  checkUnits(item) {
    return !!(item._unitAutocompOptions ||
      (item._unitReadonly && item.unit && item.unit._displayUnit));
  }


  /**
   * Check an item's skip logic status to decide if the item should be shown
   * @param item an item
   * @returns {boolean}
   */
  targetShown(item) {
    return this.lhcFormData.getSkipLogicClass(item) !== 'target-disabled';
  }



  /**
   * Get the sequence number for the current repeating item
   * @param item an item in the lforms form items array
   * @returns {string}
   */
   getRepeatingSN(item) {
    var ret = '';
    if (item._questionRepeatable) {
      var sn = item._idPath.slice(1);
      ret = sn.replace(/\//g, '.');
    }
    return ret;
  }

  /**
   * Get CSS classes for the sibling status (whether it is the first or the last sibling)
   * @param item a form item
   * @returns {string}
   */
  getSiblingStatus(item) {
    var status = "";
    if (item._lastSibling)
      status += 'lf-last-item';
    if (item._firstSibling)
      status += ' lf-first-item'
    return status;
  }


  /**
   * Get the CSS class on each item row
   * @param item an item in the lforms form items array
   * @returns {string}
   */
  getRowClass(item) {
    //var eleClass = 'level' + item._displayLevel;
    var eleClass = ' lf-datatype-' + item.dataType;
    if (item._answerRequired) {
      eleClass += ' lf-answer-required';
    }

    if (item.header) {
      eleClass += ' lhc-item-group';
    }
    else {
      eleClass += ' lhc-item-question';
    }
    if (item.dataType === 'TITLE') {
      eleClass += ' lhc-item-display';
    }

    if (!item.question || item.question.length === 0) {
      eleClass += ' lf-empty-question';
    }
    if (item._visitedBefore) {
      eleClass += ' lf-visited-before';
    }
    if (item._showValidation) {
      eleClass += ' lf-show-validation';
    }
    if (item._isHiddenFromView) {
      eleClass += ' lf-hidden-from-view';
    }
    

    return eleClass;
  }


  /**
   * Add a repeating item or a repeating group
   * @param item an item in the lforms form items array
   * @param append an optional flag indicate if the new item is added to the end of the repeating group
   */
  addOneRepeatingItem(item, append) {
    var anyEmpty = false;
    if (this.lhcFormData && !this.lhcFormData.templateOptions.allowMultipleEmptyRepeatingItems) {
      anyEmpty = this.lhcFormData.areAnyRepeatingItemsEmpty(item);
      if (anyEmpty && item._showUnusedItemWarning) {
        if (!item._unusedItemWarning)
          item._unusedItemWarning = 'Please enter info in the blank "' +
            item._text+'"';
        //$scope.sendMsgToScreenReader(item._unusedItemWarning);
      }
    }
    if (!anyEmpty) {
      var newItem = append ? this.lhcFormData.appendRepeatingItems(item) : this.lhcFormData.addRepeatingItems(item);
      //$scope.sendActionsToScreenReader();

      // broadcast the event
      // $scope.$emit(LF_CONSTANTS.EVENT_REPEATING_ITEM_ADDED,
      //     {
      //       "event": LF_CONSTANTS.EVENT_REPEATING_ITEM_ADDED,
      //       "formId": $scope.lfData.code,
      //       "itemId": newItem._elementId,
      //       "time": new Date()
      //     });

      // setTimeout(function() {
      //   var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      //   var headerItem = jQuery("label[for='" + newItem._elementId + "']")[0];
      //   var btnDel = document.getElementById("del-" + newItem._elementId);
      //   // vertical table, find the header item
      //   if (headerItem) {
      //     var anchorItem = headerItem;
      //   }
      //   // horizontal table, find the '-' button
      //   else if (btnDel) {
      //     var anchorItem = btnDel;
      //   }

      //   if (anchorItem) {
      //     var anchorPosition = anchorItem.getBoundingClientRect();
      //     // scroll down to show about 2 rows of the newly added section
      //     // if the new header item is close enough to the bottom so that the first 2 questions are not visible
      //     // if (anchorPosition && anchorPosition.bottom > viewportHeight - 70) {
      //     //   smoothScroll(anchorItem, {
      //     //     duration: 500,
      //     //     easing: 'easeInQuad',
      //     //     offset: viewportHeight - 105
      //     //   });
      //     // }
      //     // move the focus to the '-' button of the newly added item/section
      //     // a table from the '-' button moves the focus to the next input field
      //     if (btnDel)
      //       btnDel.focus();
      //   }
      // }, 1);
    }
  }

  /**
   * Remove one repeating item in a group
   * @param item an item in the lforms form items array
   */
  removeOneRepeatingItem(item) {

    var nextItem = this.lhcFormData.getNextRepeatingItem(item);

    var btnId = '';
    // move the focus to the next '-' button if there's one displayed
    // ('-' buttons are shown only when there are two repeating items shown).
    if (nextItem) {
      if (this.lhcFormData.getRepeatingItemCount(item) === 2) {
        btnId = 'add-' + nextItem._elementId;
      }
      else {
        btnId = 'del-' + nextItem._elementId;
      }
    }
    // otherwise move the focus to the add button of the previous item
    else {
      var prevItem = this.lhcFormData.getPrevRepeatingItem(item);
      if (prevItem) {
        btnId = 'add-' + prevItem._elementId;
      }
    }

    // remove the items
    this.lhcFormData.removeRepeatingItems(item);

    // $scope.sendActionsToScreenReader();

    // broadcast the event
    // $scope.$emit(LF_CONSTANTS.EVENT_REPEATING_ITEM_DELETED,
    //     {
    //       "event": LF_CONSTANTS.EVENT_REPEATING_ITEM_DELETED,
    //       "formId": $scope.lfData.code,
    //       "itemId": item._elementId,
    //       "time": new Date()
    //     });

    // set the focus
    setTimeout(function() {
      var btn = document.getElementById(btnId);
      if (btn) btn.focus();
    }, 1);
  }


  /**
  * Unset the flag to hide the warning about unused repeating items
  * @param item a repeating item
  */
  hideUnusedItemWarning(item) {
    if (this.lhcFormData && !this.lhcFormData.templateOptions.allowMultipleEmptyRepeatingItems) {
      item._showUnusedItemWarning = false;
    }
  }

}


