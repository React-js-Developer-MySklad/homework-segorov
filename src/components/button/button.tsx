import * as css from './button.module.css'
export default () => (
 <button className={css.button}
 onClick={() => alert('Button has been clicked')}>
 Click Me
 </button>
)