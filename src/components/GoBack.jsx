import React from 'react';
import {Link} from "react-router-dom";
import {ArrowLeft} from "lucide-react";

const GoBack = () => {
  return (
      <Link to="/" className="inline-flex items-center cyber-button mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
      </Link>
  )
}

export default GoBack;