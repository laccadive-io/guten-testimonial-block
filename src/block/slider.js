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
registerBlockType("cgb/testimonial-slider-block", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Testimonial Slider"), // Block title.
	icon: "format-quote", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("Testimonial Slider"), __("create-guten-block")],

	attributes: {
		testimonials: {
			type: "array",
			source: "query",
			default: [],
			selector: "blockquote.testimonial",
			query: {
				index: {
					type: "string",
					source: "text",
					selector: "span.testimonial-index"
				},
				content: {
					type: "string",
					source: "text",
					selector: "span.testimonial-text"
				},
				author: {
					type: "string",
					source: "text",
					selector: "span.testimonial-author span"
				},
				link: {
					type: "string",
					source: "text",
					selector: ".testimonial-author-link"
				}
			}
		},
		id: {
			type: "string",
			source: "attribute",
			selector: ".carousel.slide",
			attribute: "id"
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
		const { testimonials } = props.attributes;
		if (!props.attributes.id) {
			const id = `testimonial${Math.floor(Math.random() * 100)}`;
			props.setAttributes({
				id
			});
		}
		console.log("edit testimonials", testimonials);
		const testimonialsList = testimonials
			.sort((a, b) => a.index - b.index)
			.map(testimonial => {
				return (
					<div className="wp-block-cgb-testimonial-block">
						<p>
							<span>
								Insert testmonial {Number(testimonial.index) + 1} here:
							</span>
							<span
								className="remove-testimonial"
								onClick={() => {
									const newTestimonials = testimonials
										.filter(item => item.index != testimonial.index)
										.map(t => {
											if (t.index > testimonial.index) {
												t.index -= 1;
											}

											return t;
										});

									props.setAttributes({
										testimonials: newTestimonials
									});
								}}
							>
								<i className="fa fa-times" />
							</span>
						</p>
						<blockquote className="wp-block-quote">
							{/* <label>Content:</label> */}
							<PlainText
								className="content-plain-text"
								style={{ height: 58 }}
								placeholder="Testimonial text"
								value={testimonial.content}
								autoFocus
								onChange={content => {
									const newObject = Object.assign({}, testimonial, {
										content: content
									});
									props.setAttributes({
										testimonials: [
											...testimonials.filter(
												item => item.index != testimonial.index
											),
											newObject
										]
									});
								}}
							/>
							{/* <label>Author:</label> */}
							<PlainText
								className="author-plain-text"
								placeholder="Author"
								value={testimonial.author}
								onChange={author => {
									const newObject = Object.assign({}, testimonial, {
										author: author
									});
									props.setAttributes({
										testimonials: [
											...testimonials.filter(
												item => item.index != testimonial.index
											),
											newObject
										]
									});
								}}
							/>
							{/* <label>Link:</label> */}
							<PlainText
								className="link-plain-text"
								placeholder="Link to author profile"
								value={testimonial.link}
								onChange={link => {
									const newObject = Object.assign({}, testimonial, {
										link: link
									});
									props.setAttributes({
										testimonials: [
											...testimonials.filter(
												item => item.index != testimonial.index
											),
											newObject
										]
									});
								}}
							/>
						</blockquote>
					</div>
				);
			});
		return (
			<div>
				{testimonialsList}
				<button
					className="add-more-testimonial"
					onClick={content =>
						props.setAttributes({
							testimonials: [
								...props.attributes.testimonials,
								{
									index: props.attributes.testimonials.length,
									content: "",
									author: "",
									link: ""
								}
							]
						})
					}
				>
					+
				</button>
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
		const { testimonials } = props.attributes; // Content in our block.
		console.log("save testimonials", testimonials);
		const id = props.attributes.id;
		const carouselIndicators = testimonials.map(function(testimonial, index) {
			return (
				<li
					data-target={"#" + id}
					data-slide-to={index}
					className={testimonial.index == 0 ? "active" : ""}
				/>
			);
		});
		const testimonialsList = testimonials.map(function(testimonial) {
			const carouselClass =
				testimonial.index == 0 ? "carousel-item active" : "carousel-item";
			return (
				<div className={carouselClass} key={testimonial.index}>
					<blockquote className="testimonial">
						<span className="testimonial-index" style={{ display: "none" }}>
							{testimonial.index}
						</span>
						{testimonial.content && (
							<p className="testimonial-text-container">
								<i className="fa fa-quote-left pull-left" aria-hidden="true" />
								<span className="testimonial-text">{testimonial.content}</span>
								<i class="fa fa-quote-right pull-right" aria-hidden="true" />
							</p>
						)}
						<div className="testimonial-author-container">
							{testimonial.author && (
								<p className="testimonial-author-name">
									<span className="testimonial-author">
										&mdash; <span>{testimonial.author}</span>
									</span>
								</p>
							)}
							{testimonial.link && (
								<p className="testimonial-author-container">
									<a target="_blank" href={testimonial.link}>
										<i className="fas fa-user" />
										<span className="testimonial-author-link">
											{testimonial.link}
										</span>
									</a>
								</p>
							)}
						</div>
					</blockquote>
				</div>
			);
		});
		if (testimonials.length > 0) {
			return (
				<div className="testimonial-slider">
					<div className="carousel slide" data-ride="carousel" id={id}>
						<ol className="carousel-indicators">{carouselIndicators}</ol>
						<div className="carousel-inner w-75 mx-auto">
							{testimonialsList}
						</div>
						<a
							class="carousel-control-prev"
							href={"#" + id}
							role="button"
							data-slide="prev"
						>
							<span class="carousel-control-prev-icon" aria-hidden="true">
								<i className="fa fa-chevron-left" />
							</span>
							<span class="sr-only">Previous</span>
						</a>
						<a
							class="carousel-control-next"
							href={"#" + id}
							role="button"
							data-slide="next"
						>
							<span class="carousel-control-next-icon" aria-hidden="true">
								<i className="fa fa-chevron-right" />
							</span>
							<span class="sr-only">Next</span>
						</a>
					</div>
				</div>
			);
		} else return null;
	}
});
