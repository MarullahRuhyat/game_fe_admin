const DashboardIcon = function () {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-1"
        d="M0 8.84719C0 7.99027 0.366443 7.17426 1.00691 6.60496L6.34255 1.86217C7.85809 0.515019 10.1419 0.515019 11.6575 1.86217L16.9931 6.60496C17.6336 7.17426 18 7.99027 18 8.84719V17C18 19.2091 16.2091 21 14 21H4C1.79086 21 0 19.2091 0 17V8.84719Z"
        fill="#1A202C"
      />
      <path
        className="path-2"
        d="M5 17C5 14.7909 6.79086 13 9 13C11.2091 13 13 14.7909 13 17V21H5V17Z"
        fill="#6A0DAD"
      />
    </svg>
  );
};

const WarningIcon = function () {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#1A202C" className="path-1" />
      <path
        d="M9 15C9 14.4477 9.44772 14 10 14C10.5523 14 11 14.4477 11 15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15Z"
        fill="#6A0DAD"
        className="path-2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 12.75C9.58579 12.75 9.25 12.4142 9.25 12L9.25 5C9.25 4.58579 9.58579 4.25 10 4.25C10.4142 4.25 10.75 4.58579 10.75 5L10.75 12C10.75 12.4142 10.4142 12.75 10 12.75Z"
        fill="#6A0DAD"
        className="path-2"
      />
    </svg>
  );
};

const UserIcon = function () {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-2"
        d="M9 0C11.4853 0 13.5 2.01472 13.5 4.5C13.5 6.98528 11.4853 9 9 9C6.51472 9 4.5 6.98528 4.5 4.5C4.5 2.01472 6.51472 0 9 0Z"
        fill="#6A0DAD"
      />
      <path
        className="path-1"
        d="M0 18C0 14.6863 2.68629 12 6 12H12C15.3137 12 18 14.6863 18 18V21H0V18Z"
        fill="#1A202C"
      />
    </svg>
  );
};

const WithdrawIcon = function () {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-1"
        d="M3 2C3 0.89543 3.89543 0 5 0H13C14.1046 0 15 0.89543 15 2V6H13V2H5V19H13V15H15V19C15 20.1046 14.1046 21 13 21H5C3.89543 21 3 20.1046 3 19V2Z"
        fill="#1A202C"
      />
      <path
        className="path-2"
        d="M9 7L12 10H10V14H8V10H6L9 7Z"
        fill="#6A0DAD"
      />
    </svg>
  );
};

const SellerIcon = function () {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path-1"
        d="M1 1H3L4.2 5H16L14 13H5L3.5 7H1V1Z"
        fill="#1A202C"
      />
      <path
        className="path-2"
        d="M6 17C6 18.1046 5.10457 19 4 19C2.89543 19 2 18.1046 2 17C2 15.8954 2.89543 15 4 15C5.10457 15 6 15.8954 6 17Z"
        fill="#6A0DAD"
      />
      <path
        className="path-2"
        d="M14 17C14 18.1046 13.1046 19 12 19C10.8954 19 10 18.1046 10 17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17Z"
        fill="#6A0DAD"
      />
    </svg>
  );
};

const SensitiveGameIcon = function () {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gamepad Base */}
      <rect x="3" y="8" width="18" height="10" rx="3" fill="#1A202C" />

      {/* Left Button (D-pad) */}
      <path
        d="M7 12H9M8 11V13"
        stroke="#6A0DAD"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="path-1"
      />

      {/* Right Buttons */}
      <circle cx="16" cy="11" r="1" fill="#6A0DAD" />
      <circle cx="18" cy="13" r="1" fill="#6A0DAD" />

      {/* Sensitivity/Eye-Off Symbol */}
      <path
        d="M2 20C4 17 8 15 12 15C16 15 20 17 22 20"
        stroke="#6A0DAD"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="path-2"
      />
      <line
        x1="2"
        y1="20"
        x2="22"
        y2="20"
        stroke="#6A0DAD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

const GameIcon = function () {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(1.2) translate(-1.5 -2)">
        <path
          className="path-1"
          d="M2 8C1.44772 8 1 8.44772 1 9V12C1 14.7614 3.23858 17 6 17H12C14.7614 17 17 14.7614 17 12V9C17 8.44772 16.5523 8 16 8H13L11.5 10H6.5L5 8H2Z"
          fill="#1A202C"
        />
        <path
          className="path-2"
          d="M6.25 11H5.5V10.25C5.5 10.1119 5.38807 10 5.25 10H4.75C4.61193 10 4.5 10.1119 4.5 10.25V11H3.75C3.61193 11 3.5 11.1119 3.5 11.25V11.75C3.5 11.8881 3.61193 12 3.75 12H4.5V12.75C4.5 12.8881 4.61193 13 4.75 13H5.25C5.38807 13 5.5 12.8881 5.5 12.75V12H6.25C6.38807 12 6.5 11.8881 6.5 11.75V11.25C6.5 11.1119 6.38807 11 6.25 11Z"
          fill="#6A0DAD"
        />
        <path
          className="path-2"
          d="M12.5 10.75C12.5 10.3358 12.8358 10 13.25 10C13.6642 10 14 10.3358 14 10.75C14 11.1642 13.6642 11.5 13.25 11.5C12.8358 11.5 12.5 11.1642 12.5 10.75Z"
          fill="#6A0DAD"
        />
        <path
          className="path-2"
          d="M11 12.25C11 11.8358 11.3358 11.5 11.75 11.5C12.1642 11.5 12.5 11.8358 12.5 12.25C12.5 12.6642 12.1642 13 11.75 13C11.3358 13 11 12.6642 11 12.25Z"
          fill="#6A0DAD"
        />
      </g>
    </svg>
  );
};

const GameServiceIcon = function () {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.84849 0H7.15151C6.2143 0 5.45454 0.716345 5.45454 1.6C5.45454 2.61121 4.37259 3.25411 3.48444 2.77064L3.39424 2.72153C2.58258 2.27971 1.54473 2.54191 1.07612 3.30717L0.227636 4.69281C-0.240971 5.45808 0.0371217 6.43663 0.848773 6.87846C1.73734 7.36215 1.73734 8.63785 0.848771 9.12154C0.0371203 9.56337 -0.240972 10.5419 0.227635 11.3072L1.07612 12.6928C1.54473 13.4581 2.58258 13.7203 3.39424 13.2785L3.48444 13.2294C4.37259 12.7459 5.45454 13.3888 5.45454 14.4C5.45454 15.2837 6.2143 16 7.15151 16H8.84849C9.7857 16 10.5455 15.2837 10.5455 14.4C10.5455 13.3888 11.6274 12.7459 12.5156 13.2294L12.6058 13.2785C13.4174 13.7203 14.4553 13.4581 14.9239 12.6928L15.7724 11.3072C16.241 10.5419 15.9629 9.56336 15.1512 9.12153C14.2627 8.63784 14.2627 7.36216 15.1512 6.87847C15.9629 6.43664 16.241 5.45809 15.7724 4.69283L14.9239 3.30719C14.4553 2.54192 13.4174 2.27972 12.6058 2.72154L12.5156 2.77065C11.6274 3.25412 10.5455 2.61122 10.5455 1.6C10.5455 0.716344 9.7857 0 8.84849 0Z"
        fill="#1A202C"
        className="path-1"
      />
      <path
        d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
        fill="#6A0DAD"
        className="path-2"
      />
    </svg>
  );
};

const GameGenreIcon = function () {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.57666 3.61499C1.57666 2.51042 2.47209 1.61499 3.57666 1.61499H8.5C9.60456 1.61499 10.5 2.51042 10.5 3.61499V8.53833C10.5 9.64289 9.60456 10.5383 8.49999 10.5383H3.57666C2.47209 10.5383 1.57666 9.64289 1.57666 8.53832V3.61499Z"
        fill="#1A202C"
        className="path-1"
      />
      <path
        d="M13.5 15.5383C13.5 14.4338 14.3954 13.5383 15.5 13.5383H20.4233C21.5279 13.5383 22.4233 14.4338 22.4233 15.5383V20.4617C22.4233 21.5662 21.5279 22.4617 20.4233 22.4617H15.5C14.3954 22.4617 13.5 21.5662 13.5 20.4617V15.5383Z"
        fill="#1A202C"
        className="path-1"
      />
      <circle
        cx="6.03832"
        cy="18"
        r="4.46166"
        fill="#1A202C"
        className="path-1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 2C18.4142 2 18.75 2.33579 18.75 2.75V5.25H21.25C21.6642 5.25 22 5.58579 22 6C22 6.41421 21.6642 6.75 21.25 6.75H18.75V9.25C18.75 9.66421 18.4142 10 18 10C17.5858 10 17.25 9.66421 17.25 9.25V6.75H14.75C14.3358 6.75 14 6.41421 14 6C14 5.58579 14.3358 5.25 14.75 5.25H17.25V2.75C17.25 2.33579 17.5858 2 18 2Z"
        fill="#6A0DAD"
        className="path-2"
      />
    </svg>
  );
};
export {
  DashboardIcon,
  WarningIcon,
  UserIcon,
  WithdrawIcon,
  SellerIcon,
  GameIcon,
  GameServiceIcon,
  GameGenreIcon,
  SensitiveGameIcon,
};
