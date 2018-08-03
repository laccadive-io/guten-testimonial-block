<?php
/**
 * Plugin Name: Gutenberg Testimonial Block
 * Plugin URI: https://github.com/m-muhsin/guten-testimonial-block/
 * Description: Gutenberg Testimonial Block allows users to add a testimonial to the content.
 * Author: Muhammad Muhsin
 * Author URI: http://mtwoblog.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
