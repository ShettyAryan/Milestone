import { PortableText, PortableTextComponents } from '@portabletext/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { urlForImage } from '../../services/sanityClient';
import { SanityImage } from '../../types/blog.types';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#5a5a5a] leading-relaxed mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl text-[#3a3a3a] mt-12 mb-4 font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl text-[#3a3a3a] mt-10 mb-3 font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg text-[#3a3a3a] mt-8 mb-3 font-medium">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#6B4D7C] bg-[#FFF8F9] rounded-r-2xl pl-6 pr-6 py-4 my-8 italic text-[#5a5a5a]">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[#5a5a5a]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#5a5a5a]">{children}</ol>
    )
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-[#3a3a3a] font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || '';
      const isExternal = href.startsWith('http');

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[#6B4D7C] underline underline-offset-2 hover:text-[#5a3d6a] transition-colors"
        >
          {children}
        </a>
      );
    }
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage;
      const src = urlForImage(image, 1200);

      if (!src) return null;

      return (
        <figure className="my-10">
          <div className="rounded-2xl overflow-hidden border border-[rgba(107,77,124,0.1)]">
            <ImageWithFallback
              src={src}
              alt={image.alt || ''}
              className="w-full h-auto object-cover"
            />
          </div>
          {image.caption && (
            <figcaption className="text-center text-sm text-[#7a7a7a] mt-3">
              {image.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  }
};

export function PostBody({ body }: { body: any[] }) {
  if (!body || body.length === 0) {
    return null;
  }

  return (
    <div className="max-w-none">
      <PortableText value={body} components={components} />
    </div>
  );
}
