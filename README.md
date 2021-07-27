# moodle-atto_brightcove
This plugin will help you to insert the [Brightcove](https://www.brightcove.com) video in moodle atto editor.

# Dependency 
 - [Moodle-media_bcplayer](https://github.com/eLearning-BS23/moodle-media_bcplayer) to preview the video

# Instalation 

# Installing directly from the Moodle plugins directory
 - Login as an admin and go to Site administration > Plugins > Install plugins. (If you can't find this - location, then plugin installation is prevented on your site.)
 - Click the button 'Install plugins from Moodle plugins directory'.
 - Select your current Moodle version, then search for a plugin with an Install button, click the Install - button, then click Continue.
 - Confirm the installation request
 - Check the plugin validation report

# Installing via uploaded ZIP file
- Go to the Moodle plugins directory, select your current Moodle version, then download plugin with a Download button and download the ZIP file.
- go to `[moodledirectory]/lib/editor/atto/plugins/`
- Create new folder named `brightcove`
- extract zip content in it`

# Instalation via Github
- `cd [moodledirectory]/lib/editor/atto/plugins`
- clone plugin from github `git clone https://github.com/eLearning-BS23/moodle-atto_brightcove.git brightcove`

- Go to your moodle website from browser
- Confirm the installation request
- Check the plugin validation report

# Install Dependency 
- After install this plugin you have to install [Brightcove player](https://github.com/eLearning-BS23/moodle-media_bcplayer) plugin


# usages 
- go to atto editor 
- you can see brightcove logo in toolbar
- click on the logo 
- Pop-up will be shown
- insert your account id, video id and optional player id
- done! 

# Settings

 - Go to site adminishtration > plugins overview > Brightcove video
 - Go to `settings`
 - you can define the brightcove account id/ player id for default use



