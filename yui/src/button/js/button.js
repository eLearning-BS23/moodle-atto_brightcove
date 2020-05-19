// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/*
 * @package    atto_brightcove
 * @copyright  2015 Eoin Campbell
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_brightcove-button
 */

/**
 * Atto text editor import Microsoft Word file plugin.
 *
 * This plugin adds the ability to drop a Word file in and have it automatically
 * convert the contents into XHTML and into the text box.
 *
 * @namespace M.atto_brightcove
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_brightcove',
    // @codingStandardsIgnoreStart
    IMAGETEMPLATE = '<div {{#brightcove_res_width}}style="max-width: {{../brightcove_res_width}}" {{/brightcove_res_width}} >' +
        '<video-js id="my_player_{{video_id}}"' +
        '    data-video-id="{{video_id}}"' +
        '    data-account="{{account_id}}"' +
        '    data-player="{{player_id}}"' +
        '    data-embed="default"' +
        '    data-application-id' +
        '    class="vjs-fluid vjs-big-play-centered"' +
        '    {{#brightcove_width}}width="{{../brightcove_width}}" {{/brightcove_width}}' +
        '    {{#brightcove_height}}height="{{../brightcove_height}}" {{/brightcove_height}}' +
        '    controls></video-js>' +
        '</div>',
    TEMPLATES = '<form class="mform atto_form atto_brightcove" id="atto_brightcove_form">' +
        '<label for="brightcove_accountid_entry">Enter Account Id</label>' +
        '<input class="form-control fullwidth " type="text" id="brightcove_accountid_entry"' +
        'size="32" required="true"/>'+
        '<label for="brightcove_videoid_entry">Enter Video Id</label>' +
        '<input class="form-control fullwidth " type="text" id="brightcove_videoid_entry"' +
        'size="32" required="true"/>'+
        '<label for="brightcove_playerid_entry">Enter Player Id</label>' +
        '<input class="form-control fullwidth " type="text" id="brightcove_playerid_entry"' +
        'size="32" required="true"/>'+
        '<div class="mb-1">' +
        '<label for="brightcove_sizing" class="full-width-labels">Sizing</label><br>' +
        '<div class="form-check form-check-inline">' +
        '  <input class="form-check-input" type="radio" name="brightcove_sizing" id="inlineRadio1" value="res" checked>' +
        '  <label class="form-check-label" for="inlineRadio1">Responsive</label>' +
        '</div>' +
        '<div class="form-check form-check-inline">' +
        '  <input class="form-check-input" type="radio" name="brightcove_sizing" id="inlineRadio2" value="fix">' +
        '  <label class="form-check-label" for="inlineRadio2">Fixed</label>'+
        '</div>' +
        '</div>' +
        '<div class="mb-1" >' +
        '    <label>Size</label>' +
        '    <div class="form-inline " >' +
        '        <label class="accesshide">Video width</label>' +
        '        <input type="text" class="form-control mr-1  input-mini" size="4" id="brightcove_width" value="960"> x' +
        '        <label class="accesshide">Video height</label>' +
        '        <input type="text" class="form-control ml-1 input-mini" size="4" id="brightcove_height" value="540">' +
        '        <label class="accesshide">Unit</label>' +
        '        <select class="form-control ml-1 input-mini"  id="brightcove_width_unit">' +
        '            <option value="px" selected>px</option>' +
        '            <option value="cm" >cm</option>' +
        '            <option value="%" >%</option>' +
        '        </select>' +
        '    </div>' +
        '</div>' +
        '<div class="clearfix"></div>' +
        '<div class="mdl-align">' +
        '<br>' +
        '<button class="btn btn-secondary submit" type="submit">Insert Brightcove Video</button>' +
        '</div>' +
        '</form>';
    // @codingStandardsIgnoreEnd

Y.namespace('M.atto_brightcove').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    /**
     * Add event listeners.
     *
     * @method initializer
     */

    initializer: function() {
        // If we don't have the capability to view then give up.
        if (this.get('disabled')) {
            return;
        }

        this.addButton({
            icon: 'brightcove',
            iconComponent: COMPONENTNAME,
            callback: this._handleWordFileUpload,
            callbackArgs: 'brightcove'
        });
        // this.editor.on('drop', this._handleWordFileDragDrop, this);
    },

    /**
     * Handle a Word file upload via the filepicker
     *
     * @method _handleWordFileUpload
     * @param {object} params The parameters provided by the filepicker.
     * containing information about the file.
     * @private
     * @return {boolean} whether the uploaded file is .docx
     */
    _handleWordFileUpload: function() {
        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('pluginname', COMPONENTNAME),
            focusAfterHide: true,
            width: 660
            // focusOnShowSelector: SELECTORS.URL_INPUT
        });

        dialogue.set('bodyContent', this._getDialogueContent(this.get('host').getSelection())).show();
        M.form.shortforms({formid: 'atto_brightcove_form'});
    },

    /**
     * Returns the dialogue content for the tool.
     *
     * @method _getDialogueContent
     * @param  {WrappedRange[]} selection Current editor selection
     * @return {Y.Node}
     * @private
     */
    _getDialogueContent: function(selection) {
        var content =  Y.Node.create(
            Y.Handlebars.compile(TEMPLATES)()
        );
        return this._attachEvents(content,selection);
    },
    /**
     * Attaches required events to the content node.
     *
     * @method _attachEvents
     * @param  {Y.Node}         content The content to which events will be attached
     * @param  {WrappedRange[]} selection Current editor selection
     * @return {Y.Node}
     * @private
     */
    _attachEvents: function(content, selection) {
        content.one('.submit').on('click', function(e) {
            e.preventDefault();
            var mediaHTML = this._getMediaHTMLBrightcove(e.currentTarget.ancestor('.atto_form')),
                host = this.get('host');

            this.getDialogue({
                focusAfterHide: null
            }).hide();
            if (mediaHTML) {
                host.setSelection(selection);
                host.insertContentAtFocusPoint(mediaHTML);
                this.markUpdated();
            }
        }, this);

        return content;
    },
    /**
     * Returns the HTML to be inserted to the text area for the link tab.
     *
     * @method _getMediaHTMLLink
     * @param  {Y.Node} tab The tab from which to extract data
     * @return {String} The compiled markup
     * @private
     */
    _getMediaHTMLBrightcove: function(tab) {
        var brightcove_width_unit = tab.one("#brightcove_width_unit").get('value') || 'px';
        var brightcove_width = tab.one("#brightcove_width").get('value') + brightcove_width_unit;
        var brightcove_height = tab.one("#brightcove_height").get('value') + brightcove_width_unit;
        var brightcove_sizing= document.querySelector('input[name="brightcove_sizing"]:checked').value;

        var context = {
            account_id: tab.one("#brightcove_accountid_entry").get('value'),
            video_id: tab.one("#brightcove_videoid_entry").get('value'),
            player_id: tab.one("#brightcove_playerid_entry").get('value')
        };
        if (brightcove_sizing === 'res') {
            context.brightcove_res_width = brightcove_width;
        }else {
            context.brightcove_width = brightcove_width;
            context.brightcove_height = brightcove_height;
        }
        return context.video_id ? Y.Handlebars.compile(IMAGETEMPLATE)(context) : '';
    }


}, {
    ATTRS: {
        disabled: {
            value: true
        },
        area: {
            value: {}
        }
    }
});
