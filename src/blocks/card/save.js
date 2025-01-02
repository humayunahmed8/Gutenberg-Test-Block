import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { title, body, imageUrl, imageAlt, buttonText, buttonUrl, color } = attributes;
	const blockProps = useBlockProps.save(); // Get block props for save context

	return (
		<div {...blockProps} className={`wp-block-custom-card ${blockProps.className || ''}`}>
			{imageUrl && (
				<div className="card-image">
					<img src={imageUrl} alt={imageAlt} />
				</div>
			)}
			{title && <h2 style={{ color }}>{title}</h2>}
			{body && <p>{body}</p>}
			{buttonText && buttonUrl && (
				<div className="card-button">
					<a href={buttonUrl}>{buttonText}</a>
				</div>
			)}
		</div>
	);
}