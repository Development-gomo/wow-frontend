import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * The photo carousel used on accommodation cards: a sliding strip of photos
 * with a pill of previous / dots / next controls that fades in on hover.
 * Shared by the listing cards, the room options and the "similar rooms" cards.
 * With a single photo it shows just the image, with no controls.
 */
export function PhotoCarousel({ images, title, heightClass = "h-[240px]" }: { images: string[]; title: string; heightClass?: string }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);


  return (
    <div className={`group/img relative w-full overflow-hidden ${heightClass}`}>
      <div
        className="flex h-full transition-transform duration-700 ease-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={`${src}-${i}`}
            src={src}
            alt={`${title} photo ${i + 1} of ${count}`}
            loading="lazy"
            aria-hidden={i !== index}
            className="h-full w-full flex-none object-cover"
          />
        ))}
      </div>
      {count > 1 && (
        <div className="group/dots absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center rounded-full border border-transparent py-1.5 pl-1.5 pr-1.5 transition-[background-color,backdrop-filter,border-color] duration-300 hover:border-pearl/20 hover:bg-pearl/10 hover:backdrop-blur-[5px] group-hover/img:border-pearl/20 group-hover/img:bg-pearl/10 group-hover/img:backdrop-blur-[5px] has-[:focus-visible]:border-pearl/20 has-[:focus-visible]:bg-pearl/10 has-[:focus-visible]:backdrop-blur-[5px] motion-reduce:transition-none">
          <button
            type="button"
            aria-label={`Previous ${title} photo`}
            onClick={() => go(-1)}
            className="flex h-4 w-4 items-center justify-center text-pearl opacity-0 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))] transition-opacity duration-200 hover:text-white focus-visible:opacity-100 group-hover/dots:opacity-100 group-hover/img:opacity-100 group-has-[:focus-visible]/dots:opacity-100 motion-reduce:transition-none"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.25} />
          </button>
          <div className="flex items-center gap-2 px-2 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))]">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show ${title} photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`rounded-full bg-pearl transition-all duration-200 motion-reduce:transition-none ${i === index ? "h-2 w-2 opacity-100" : "h-1 w-1 opacity-100"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label={`Next ${title} photo`}
            onClick={() => go(1)}
            className="flex h-4 w-4 items-center justify-center text-pearl opacity-0 [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.45))] transition-opacity duration-200 hover:text-white focus-visible:opacity-100 group-hover/dots:opacity-100 group-hover/img:opacity-100 group-has-[:focus-visible]/dots:opacity-100 motion-reduce:transition-none"
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.25} />
          </button>
        </div>
      )}
    </div>
  );
}
