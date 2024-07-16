<?php


function start_block_init()
{
	$blocks = [
		['name' => 'block']
		// ['name' => 'search-form', 'options' => [
		// 	'render_callback' => 'up_search_form_render_cb'
		// ]]

	];
	foreach ($blocks as $block) {
		register_block_type(__DIR__ . '/build/' . $block['name']);
	}
}
