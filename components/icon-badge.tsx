import React from 'react';
import {LucideIcon} from "lucide-react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

// cva is a function that returns a function that returns a string. It's used to create a class variance authority.
const backgroundVariants = cva(
	"rounded-full flex items-center justify-center",
	{
		variants: {
			variant: {
				default: "bg-sky-100",
				success: "bg-green-100",
			},

			size: {
				default: "p-2",
				sm: "p-1",
				lg: "p-3",
			},
		},

		defaultVariants: {
			variant: "default",
			size: "default",
		}
	}
);

const iconVariants = cva(
	"",
	{
		variants: {
			variant: {
				default: "text-sky-500",
				success: "text-green-500",
			},

			size: {
				default: "w-6 h-6",
				sm: "w-4 h-4",
				lg: "w-8 h-8",
			},
		},

		defaultVariants: {
			variant: "default",
			size: "default",
		}
	}
);

// const backgroundVariants = cva(
//   "rounded-full flex items-center justify-center",
//   {
//     variants: {
//       variant: {
//         default: "bg-sky-100",
//         success: "bg-emerald-100",
//       },
//       size: {
//         default: "p-2",
//         sm: "p-1",
//       }
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     }
//   }
// );
//
// const iconVariants = cva(
//   "",
//   {
//     variants: {
//       variant: {
//         default: "text-sky-700",
//         success: "text-emerald-700",
//       },
//       size: {
//         default: "h-8 w-8",
//         sm: "h-4 w-4"
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     }
//   }
// );

// 'type' keyword is used to create a type alias, which is a name for a type, similar to 'using' keyword in C++.
type BackgroundVariantProps = VariantProps<typeof backgroundVariants>;
type IconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
	icon: LucideIcon;
}

const IconBadge = ({icon: Icon, variant, size}: IconBadgeProps) => {
	return (
		// Here, the div is being used as a background for the icon.
		// cn is used to concatenate the classes.
		<div className={cn(backgroundVariants({variant: variant, size: size}))}>
			<Icon className={cn(iconVariants({variant: variant, size: size}))}/>
		</div>
	);
};

export default IconBadge;