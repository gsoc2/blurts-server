import { getMessage } from '../../utils/fluent.js'

const containerStyle = `
  background: #f9f9fa;
  color: black;
  padding: 36px 0 24px;
`

const ctaStyle = `
  background-color: #0060df;
  border-radius: 4px;
  color: white;
  display: inline-block;
  margin: 24px 0;
  margin: auto;
  padding: 12px 24px;
`

export default (data) => `
  <tr>
    <td style='${containerStyle}'>
      <p>
        ${getMessage('email-verify-simply-click')}
      </p>
      <a
        href='${data.ctaHref}'
        style='${ctaStyle}'
      >
        ${getMessage('verify-email-cta')}
      </a>
      <p>
        <strong>
          ${getMessage('email-link-expires')}
        </strong>
      </p>
    </td>
  </tr>
`
