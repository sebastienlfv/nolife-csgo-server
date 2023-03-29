<?php 
global $lgsl_config; $lgsl_config = array(); 
$lgsl_config['feed']['method'] = 0; 
$lgsl_config['feed']['url'] = "http://www.greycube.co.uk/lgsl/feed/lgsl_files/lgsl_feed.php"; 
$lgsl_config['style'] = "disc_ff_style.css"; // options: breeze_style.css, darken_style.css, classic_style.css, ogp_style.css, parallax_style.css, disc_ff_style.css, materials_style.css 
$lgsl_config['scripts'] = []; 
$lgsl_config['locations'] = 1; 
$lgsl_config['list']['totals'] = true; 
$lgsl_config['sort']['servers'] = "players";	// OPTIONS: id  type  zone  players  status 
$lgsl_config['sort']['players'] = "score";	// OPTIONS: name  score 
$lgsl_config['zone']['width'] = "160"; // images will be cropped unless also resized to match 
$lgsl_config['zone']['line_size'] = "19";  // player box height is this number multiplied by player names 
$lgsl_config['zone']['height'] = "100"; // player box height limit 
$lgsl_config['grid'][1] = 1; 
$lgsl_config['grid'][2] = 1; 
$lgsl_config['grid'][3] = 1; 
$lgsl_config['grid'][4] = 1; 
$lgsl_config['grid'][5] = 1; 
$lgsl_config['grid'][6] = 1; 
$lgsl_config['grid'][7] = 1; 
$lgsl_config['grid'][8] = 1; 
$lgsl_config['players'][1] = 1; 
$lgsl_config['players'][2] = 1; 
$lgsl_config['players'][3] = 1; 
$lgsl_config['players'][4] = 1; 
$lgsl_config['players'][5] = 1; 
$lgsl_config['players'][6] = 1; 
$lgsl_config['players'][7] = 1; 
$lgsl_config['players'][8] = 1; 
$lgsl_config['random'][0] = 0; 
$lgsl_config['random'][1] = 0; 
$lgsl_config['random'][2] = 0; 
$lgsl_config['random'][3] = 0; 
$lgsl_config['random'][4] = 0; 
$lgsl_config['random'][5] = 0; 
$lgsl_config['random'][6] = 0; 
$lgsl_config['random'][7] = 0; 
$lgsl_config['random'][8] = 0; 
$lgsl_config['hide_offline'][0] = false; 
$lgsl_config['hide_offline'][1] = 0; 
$lgsl_config['hide_offline'][2] = 0; 
$lgsl_config['hide_offline'][3] = 0; 
$lgsl_config['hide_offline'][4] = 0; 
$lgsl_config['hide_offline'][5] = 0; 
$lgsl_config['hide_offline'][6] = 0; 
$lgsl_config['hide_offline'][7] = 0; 
$lgsl_config['hide_offline'][8] = 0; 
$lgsl_config['title'][0] = "Live Game Server List"; 
$lgsl_config['title'][1] = "Game Server"; 
$lgsl_config['title'][2] = "Game Server"; 
$lgsl_config['title'][3] = "Game Server"; 
$lgsl_config['title'][4] = "Game Server"; 
$lgsl_config['title'][5] = "Game Server"; 
$lgsl_config['title'][6] = "Game Server"; 
$lgsl_config['title'][7] = "Game Server"; 
$lgsl_config['title'][8] = "Game Server"; 
$lgsl_config['admin']['user'] = "lgslroot"; 
$lgsl_config['admin']['pass'] = "lgslroot"; 
$lgsl_config['db']['server']  = "localhost"; 
$lgsl_config['db']['user']    = "root"; 
$lgsl_config['db']['pass']    = ""; 
$lgsl_config['db']['db']      = "lgsl"; 
$lgsl_config['db']['table']   = "lgsl"; 
$lgsl_config['image_mod']     = true; 
$lgsl_config['preloader']     = false;   // true=using ajax to faster loading page
$lgsl_config['pagination_mod']= false;   // true = using pagination
$lgsl_config['pagination_lim']= 15;   // limit per page
$lgsl_config['direct_index']  = 0;                     // 1=link to index.php instead of the folder 
$lgsl_config['no_realpath']   = 0;                     // 1=do not use the realpath function 
$lgsl_config['url_path']      = "";                  // full url to /lgsl_files/ for when auto detection fails 
$lgsl_config['management']    = 0;                     // 1=show advanced management in the admin by default 
$lgsl_config['host_to_ip']    = 0;                     // 1=show the servers ip instead of its hostname 
$lgsl_config['public_add']    = false; // 1=servers require approval OR 2=servers shown instantly 
$lgsl_config['public_feed']   = 0;                     // 1=feed requests can add new servers to your list 
$lgsl_config['cache_time']    = 60; // seconds=time before a server needs updating 
$lgsl_config['autoreload']    = false; // 1=reloads page when cache_time is passed 
$lgsl_config['history']       = true;    // 1=reloads page when cache_time is passed 
$lgsl_config['live_time']     = 3;                     // seconds=time allowed for updating servers per page load 
$lgsl_config['timeout']       = 0;                     // 1=gives more time for servers to respond but adds loading delay 
$lgsl_config['retry_offline'] = 0;                     // 1=repeats query when there is no response but adds loading delay 
$lgsl_config['cms']           = "sa";                // sets which CMS specific code to use 
include("languages/english.php");        // sets LGSL language