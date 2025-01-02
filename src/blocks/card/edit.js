import { RichText, MediaUpload, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TextControl, Button, RangeControl } from '@wordpress/components';
import './editor.scss';
import colors from '../../utilities/colors-palette';


export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { title, body, imageUrl, imageAlt, buttonText, buttonUrl, color,
		fontSizeMobile, fontSizeTablet, fontSizeDesktop } = attributes;
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
						onChange={(newColor) => setAttributes({ color: newColor })}
					/>

					<RangeControl
						label="Font Size Mobile"
						value={fontSizeMobile}
						onChange={(value) => setAttributes({ fontSizeMobile: value })}
						min={12}
						max={50}
					/>
					<RangeControl
						label="Font Size Tablet"
						value={fontSizeTablet}
						onChange={(value) => setAttributes({ fontSizeTablet: value })}
						min={12}
						max={50}
					/>
					<RangeControl
						label="Font Size Desktop"
						value={fontSizeDesktop}
						onChange={(value) => setAttributes({ fontSizeDesktop: value })}
						min={12}
						max={50}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className="wp-block-custom-card">
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
					style={{
						color,
						fontSize: `${fontSizeDesktop}px`,
						'--mobile-font': `${fontSizeMobile}px`,
						'--tablet-font': `${fontSizeTablet}px`,
						'--desktop-font': `${fontSizeDesktop}px`
					}}
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
