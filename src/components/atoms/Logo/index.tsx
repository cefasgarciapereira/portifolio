import { useState } from "react";

export default function Logo() {
    const [isHovering, setIsHovering] = useState(false)

    return (
        <svg
            className="img-fluid"
            id="outputsvg"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: "none",
                transformOrigin: "50% 50%",
                cursor: "pointer",
                maxHeight: "none",
                transition: ".3s"
            }}
            width="56"
            height="53"
            viewBox="0 0 4260 4080"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <g
                id="l1MzkXFWG0tDaRwJb8BgIft"
                fill={isHovering ? "var(--font-color)" : "none"}
                strokeWidth={150}
                stroke="var(--font-color)"
                style={{ transform: "none", transition: ".3s" }}
            >
                <g style={{ transform: "none" }}>
                    <path
                        id="p8PLfwXmV"
                        d="M 1990 3884 c -334 -38 -605 -128 -843 -281 -229 -146 -466 -388 -607 -618 -113 -185 -212 -466 -251 -715 -18 -110 -18 -410 0 -520 40 -255 137 -527 252 -712 115 -184 318 -407 474 -523 379 -280 811 -407 1270 -375 237 17 519 96 738 207 151 76 419 287 538 424 170 195 320 466 388 699 10 36 22 73 26 82 5 13 -6 23 -52 46 -103 52 -290 122 -395 147 -329 80 -549 48 -873 -125 -336 -181 -426 -211 -568 -191 -247 34 -443 208 -501 442 -21 84 -21 220 0 290 57 193 229 367 410 414 67 17 206 20 284 5 129 -24 282 -131 357 -249 35 -54 35 -54 431 -48 219 4 520 7 670 7 272 0 272 0 266 43 -19 134 -98 376 -165 510 -93 183 -216 352 -360 494 -285 280 -571 434 -967 520 -97 21 -149 26 -302 28 -102 2 -201 1 -220 -1 z "
                    ></path>
                </g>
            </g>
        </svg>
    );
}
