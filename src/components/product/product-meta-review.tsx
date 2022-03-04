import { useState } from "react";
import { Collapse } from "@components/common/accordion";
import ReviewForm from "@components/common/form/review-form";

interface Props {
	data: any;
}

const ProductMetaReview: React.FC<Props> = ({ data }) => {
	const [expanded, setExpanded] = useState<number>(0);
	data.meta = [
		{
			"id": 1,
			"title": "Product Details",
			"content": data?.data?.attributes.ProductDetails
		},
		{
			"id": 2,
			"title": "Additional Information",
			"content": data?.data?.attributes.AdditionalInformation
		},
	]
	return (
		<>
			{data?.meta.map((item: any, index: any) => (
				<Collapse
					i={index}
					key={item.title}
					title={item.title}
					translatorNS="review"
					content={
						data?.meta.length === item.id ? (
							<>
								{item.content} {/*<ReviewForm />*/}
							</>
						) : (
							item.content
						)
					}
					expanded={expanded}
					setExpanded={setExpanded}
					variant="transparent"
				/>
			))}
		</>
	);
};

export default ProductMetaReview;
