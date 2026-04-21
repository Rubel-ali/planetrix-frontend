"use client";

export default function Footer() {
  return (
    <footer className=" mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-4">
            <div className="py-5">
              <div className="flex">
                <img
                  src="/Group.png"
                  alt="Planetrrix Logo"
                  className="h-8 md:h-10 object-contain"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Lorem ipsum dolor sit amet consectetur. Foiset dui tincidunt
              pharetra sed arcu sed commodo.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-right">
            <a
              href="#"
              className="text-2xs text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-2xs text-muted-foreground hover:text-primary transition-colors"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-2xs text-muted-foreground hover:text-primary transition-colors"
            >
              Career
            </a>
            <a
              href="#"
              className="text-2xs text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-2xs text-muted-foreground hover:text-primary transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
