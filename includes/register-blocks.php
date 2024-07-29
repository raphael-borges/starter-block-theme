<?php

function start_block_init()
{
	$blocks = [
		['name' => 'block'],
		// ['name' => 'form']
		// ['name' => 'search-form', 'options' => [
		// 	'render_callback' => 'up_search_form_render_cb'
		// ]]

	];
	foreach ($blocks as $block) {
		register_block_type(START_THEME_DIR . '/blocks/' . $block['name']);
	}
}


// Registre Theme Category
function start_block_categories($block_categories, $editor_context)
{
	if (!empty($editor_context->post)) {
		array_unshift(
			$block_categories,
			array(
				'slug'  => 'start-category',
				'title' => __('Theme', 'start-blocks-category'),
				'icon'  => null,
			)
		);
	}
	return $block_categories;
}
