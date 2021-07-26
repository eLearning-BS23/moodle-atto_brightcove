<?php
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

/**
 * Library functions for Atto brightcove plugin
 * @package     atto_brightcove
 * @copyright   2020 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();



/**
 * Initialise the strings required for js
 *
 * @return void
 */
function atto_brightcove_strings_for_js() {
    global $PAGE;

    $strings = array(
        'uploading',
        'transformationfailed',
        'fileuploadfailed',
        'fileconversionfailed',
        'pluginname'
    );
    $strings = array(
        'uploading',
        'transformationfailed',
        'fileuploadfailed',
        'fileconversionfailed',
        'pluginname',
        'enter_account_id',
        'enter_video_id',
        'enter_player_id',
        'video_sizing',
        'video_size',
        'video_responsive',
        'video_fixed',
        'video_width',
        'video_height',
        'insert_brightcove_video',
    );

    $PAGE->requires->strings_for_js($strings, 'atto_brightcove');
}


/**
 * Sends the parameters to JS module.
 *
 * @param string $elementid - unused
 * @param stdClass $options the options for the editor, including the context
 * @param stdClass $fpoptions - unused
 * @return array
 * @throws coding_exception
 * @throws dml_exception
 */
function atto_brightcove_params_for_js($elementid, $options, $fpoptions) {
    global $USER;

    $brightcoveaccount = get_config('atto_brightcove', 'account');
    $brightcoveplayer = get_config('atto_brightcove', 'player');
    $brightcoveplayer = get_config('atto_brightcove', 'player');

    // Disabled if:
    // - Not logged in or guest.
    // - Files are not allowed.
    // - Only URL are supported.
    $disabled = !isloggedin() || isguestuser() ||
            (!isset($options['maxfiles']) || $options['maxfiles'] == 0) ||
            (isset($options['return_types']) && !($options['return_types'] & ~FILE_EXTERNAL));

    $params = array('disabled' => $disabled, 'area' => array(), 'usercontext' => null,
        'brightcoveAccount' => $brightcoveaccount, 'brightcovePlayer' => $brightcoveplayer);

    if (!$disabled) {
        $params['usercontext'] = context_user::instance($USER->id)->id;
        foreach (array('itemid', 'context', 'areamaxbytes', 'maxbytes', 'subdirs', 'return_types') as $key) {
            if (isset($options[$key])) {
                if ($key === 'context' && is_object($options[$key])) {
                    // Just context id is enough.
                    $params['area'][$key] = $options[$key]->id;
                } else {
                    $params['area'][$key] = $options[$key];
                }
            }
        }
    }

    return $params;
}



