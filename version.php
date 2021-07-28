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

$plugin->version   = 2021072700;
$plugin->requires  = 2019111803; // Requires Moodle 3.8.3
$plugin->component = 'atto_brightcove';  // Full name of the plugin (used for diagnostics).
$plugin->release   = '1.0.3'; // Human readable version information.
$plugin->maturity = MATURITY_STABLE; // This is considered as ready for production sites.

$plugin->dependencies = [
    'media_bcplayer' => '2021072700'
];
