// import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TextControl, Button } from '@wordpress/components';

// editor style
import './editor.scss';

// colors
import colors from '../../utilities/colors-palette';

export default function Edit({ attributes, setAttributes }) {
	const { title, body, imageUrl, imageAlt, buttonText, buttonUrl, color } = attributes;
	return (
		<>
			<InspectorControls>
				<PanelBody title="Card Settings">
					<TextControl
						label="Button URL"
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
					<TextControl
						label="Button Text"
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
					<ColorPalette
						colors={colors}
						value={color}
						onChange={(newColor) =>
							setAttributes({ color: newColor })
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className="wp-block-custom-card">
				<MediaUpload
					onSelect={(media) => {
						setAttributes({
							imageUrl: media.url,
							imageAlt: media.alt
						});
					}}
					type="image"
					render={({ open }) => (
						<div className="card-image-container">
							{imageUrl ? (
								<img src={imageUrl} alt={imageAlt} onClick={open} />
							) : (
								<Button
									onClick={open}
									className="button-large"
								>
									Upload Image
								</Button>
							)}
						</div>
					)}
				/>

				<RichText
					tagName="h2"
					value={title}
					style={{ color }}
					onChange={(value) => setAttributes({ title: value })}
					placeholder="Card Title"
				/>

				<RichText
					tagName="p"
					value={body}
					onChange={(value) => setAttributes({ body: value })}
					placeholder="Card Content"
				/>

				<div className="card-button">
					<RichText
						tagName="span"
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
				</div>
			</div>
		</>
	);
}