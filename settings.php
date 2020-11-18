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
 * atto Brightcove plugin settings
 * @package     atto_brightcove
 * @copyright   2020 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();


$ADMIN->add('editoratto', new admin_category('atto_brightcove', new lang_string('brightcove_account', 'atto_brightcove')));

if ($ADMIN->fulltree) {
    $desc = get_string('brightcove_account_desc', 'atto_brightcove');
    $default = 0;

    $settings->add(new admin_setting_configtext('atto_brightcove/account', get_string('brightcove_account', 'atto_brightcove'),
        $desc, $default, PARAM_INT, 20));

    $descplayer = get_string('brightcove_player_desc', 'atto_brightcove');
    $settings->add(new admin_setting_configtext('atto_brightcove/player', get_string('brightcove_player', 'atto_brightcove'),
        $descplayer, 'default', PARAM_RAW_TRIMMED, 20));


}
