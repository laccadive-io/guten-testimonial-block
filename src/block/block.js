/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";

const __ = wp.i18n.__; // The __() for internationalization.
const registerBlockType = wp.blocks.registerBlockType; // The registerBlockType() to register blocks.
const { RichText, PlainText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/testimonial-block", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Testimonial Block"), // Block title.
	icon: "format-quote", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("Testimonial Block"), __("create-guten-block")],

	attributes: {
		content: {
			type: "string",
			// source: "children",
			selector: "span.testimonial-text"
		},
		author: {
			type: "string",
			// source: "children",
			selector: "span.testimonial-author"
		},
		link: {
			type: "string",
			// source: "children",
			selector: ".testimonial-author-link a"
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	// The "edit" property must be a valid function.
	edit: function(props) {
		return (
			<div className="wp-block-cgb-testimonial-block">
				<p>Insert testmonial here:</p>
				<blockquote className="wp-block-quote">
					{/* <label>Content:</label> */}
					<PlainText
						className="content-plain-text"
						style={{height: 58}}
						placeholder="Testimonial text"
						value={props.attributes.content}
						onChange={content => props.setAttributes({ content: content })}
					/>
					{/* <label>Author:</label> */}
					<PlainText
						className="author-plain-text"
						placeholder="Author"
						value={props.attributes.author}
						onChange={content => props.setAttributes({ author: content })}
					/>
					{/* <label>Link:</label> */}
					<PlainText
						className="link-plain-text"
						placeholder="Link to author profile"
						value={props.attributes.link}
						onChange={content => props.setAttributes({ link: content })}
					/>
				</blockquote>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function(props) {
		var content = props.attributes.content; // Content in our block.
		var author = props.attributes.author; // Content in our block.
		var link = props.attributes.link; // Content in our block.
		return (
			<div>
				<blockquote>
					{content && (
						<p className="testimonial-text-container">
							<i className="fa fa-quote-left pull-left" aria-hidden="true" />
							<span className="testimonial-text">{content}</span>
							<i class="fa fa-quote-right pull-right" aria-hidden="true" />
						</p>
					)}
					<div className="testimonial-author-container">
						{author && (
							<p className="testimonial-author-name">
								<span className="testimonial-author">- {author}</span>
							</p>
						)}
						{link && (
							<p className="testimonial-author-link">
								<a target="_blank" href={link}>
									<i className="fas fa-user" />
									<span className="testimonial-author-link">{link}</span>
								</a>
							</p>
						)}
					</div>
				</blockquote>
			</div>
		);
	}
});
